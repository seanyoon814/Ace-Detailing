import "./PortalReports.css";

import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../features/auth/authApiSlice";
import {
    createColumnHelper,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";

import axios from "axios";

const columnHelper = createColumnHelper<any>();
const columns = [
    columnHelper.accessor("status", {
        header: "STATUS",
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("imageUrls", {
        header: "IMAGE",
        cell: info => info.getValue()[0] ? <img src={info.getValue()[0]} /> : <img />,
        footer: info => info.column.id,
    }),
    columnHelper.accessor("stockNumber", {
        header: "STOCK NUMBER",
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("services", {
        header: "SERVICES",
        cell: info => info.getValue().map(item => item.name).join(", "),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
        header: "CREATED AT",
        cell: info => new Date(info.getValue()).toLocaleString(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("updatedAt", {
        header: "LAST UPDATED",
        cell: info => new Date(info.getValue()).toLocaleString(),
        footer: info => info.column.id,
    }),
];

function PortalReports({ setPage } : { setPage: Function }) {

    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10, // default page size
    });

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    const {
        data: reportsData,
        isSuccess,
        isLoading,
        isError,
        error: reportsError
    } = useGetDataQuery("/reports", {
        pollingInterval: 120000, // 2 minutes
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    useLayoutEffect(() => {
        updatePagination();
        window.addEventListener('resize', updatePagination);
    }, []);

    useEffect(() => {
        if (isError){
            if (
                reportsError?.originalStatus === 401
                || reportsError?.status === 401
                || reportsError?.originalStatus === 403
                || reportsError?.status === 403
            ) {
                toast.error("Token expired. Please Login.");
                navigate('/user');
            }
        }
        else if (isSuccess){ 
            setData(reportsData);
        }
    }, [isSuccess, isLoading, isError, reportsData, reportsError]);
    
    function updatePagination() {
        const container = document.getElementsByClassName("portal-table-container")[0] as Element;

        if (!container) return;

        container.style.height = "100%";
        const containerStyle = getComputedStyle(container);
        const containerEm = parseFloat(containerStyle.fontSize);
        
        const tableHeight = parseFloat(containerStyle.height) - 3.05 * containerEm;
        const pageSize = Math.floor((tableHeight - 2 * containerEm) / (6 * containerEm));
        
        setPagination({
            pageIndex: Math.floor((pagination.pageIndex * pagination.pageIndex) / pageSize),
            pageSize
        });

        container.style.height = "fit-content";
    }

    function applyFilter(e: Event) {
        e.preventDefault();

        const stockNumber = (document.getElementById("stockNumber") as HTMLInputElement)?.value;
        const status = (document.getElementById("status") as HTMLSelectElement)?.value;

        if (!stockNumber && status === "All") {
            table.resetColumnFilters();
            return;
        }

        const filters = [];

        if (stockNumber) filters.push({ id: "stockNumber", value: stockNumber, includesString: true });
        if (status !== "All") filters.push({ id: "status", value: status, includesString: true });

        console.log(filters);

        table.setColumnFilters(filters);
    }

    return (
        <>
            <div>
                <h3>Reports</h3>
                <button onClick={() => setPage("Reports-Create")}>CREATE NEW</button>
            </div>
            <form className="portal-table-filter" onSubmit={(e) => applyFilter(e)}>
                <div>
                    <label>Status</label>
                    <select id="status" defaultValue="All">
                        <option>All</option>
                        <option>PENDING</option>
                        <option>ACCEPTED</option>
                        <option>REJECTED</option>
                    </select>
                </div>
                <div>
                    <label>Stock Number</label>
                    <input id="stockNumber" placeholder="Search for stock number"></input>
                </div>
                <div>
                    <label>Placeholder</label>
                    <button type="submit">FILTER</button>
                </div>
            </form>
            <section className="portal-table-container">
                <div>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <strong>
                        {`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount().toLocaleString()}`}
                    </strong>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                </div>
                <table className="portal-table reports-table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {cell.column.columnDef.cell(cell)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default PortalReports;