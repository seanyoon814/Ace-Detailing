import "./PortalVehicles.css";

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

import useAuth from '../../hooks/useAuth';

const columnHelper = createColumnHelper<any>();
const columns = [
    columnHelper.accessor("step", {
        header: "STEP",
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableColumnFilter: true,
        filterFn: "equals",
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
        enableColumnFilter: true,
        filterFn: "includesString",
    }),
    columnHelper.accessor("vehicle", {
        header: "VEHICLE",
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableColumnFilter: true,
        filterFn: "includesString",
    }),
    columnHelper.accessor("notes", {
        header: "NOTES",
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
        header: "CREATED AT",
        cell: info => new Date(info.getValue()).toLocaleString(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor("updatedAt", {
        header: "MODIFIED AT",
        cell: info => new Date(info.getValue()).toLocaleString(),
        footer: info => info.column.id,
    }),
];

function PortalVehicles({ setPage } : { setPage: Function }) {

    const navigate = useNavigate();
    const { admin, id } = useAuth();

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
    
    const path = admin ? "/vehicles/" : `/vehicles?userId=${id}`;
    const {
        data: vehicleData,
        isSuccess,
        isLoading,
        isError,
        error: vehicleErrmsg
    } = useGetDataQuery(path, {
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
                vehicleErrmsg?.originalStatus === 401
                || vehicleErrmsg?.status === 401
                || vehicleErrmsg?.originalStatus === 403
                || vehicleErrmsg?.status === 403
            ) {
                toast.error("Token expired. Please Login.");
                navigate('/user');
            }
        }
        else if (isSuccess){ 
            setData(vehicleData);
        }
    }, [isSuccess, isLoading, isError, vehicleData, vehicleErrmsg]);

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
        const vehicle = (document.getElementById("vehicle") as HTMLInputElement)?.value;
        const step = (document.getElementById("step") as HTMLSelectElement)?.value;

        if (!stockNumber && !vehicle && step === "All") {
            table.resetColumnFilters();
            return;
        }

        const filters = [];

        if (stockNumber) filters.push({ id: "stockNumber", value: stockNumber, includesString: true });
        if (vehicle) filters.push({ id: "vehicle", value: vehicle, includesString: true });
        if (step !== "All") filters.push({ id: "step", value: step, includesString: true });

        table.setColumnFilters(filters);
    }

    return (
        <>
            <div>
                <h3>Vehicles</h3>
                { admin ? <button onClick={() => setPage("Vehicles-Create")}>CREATE NEW</button> : <></> }
            </div>
            <form className="portal-table-filter" onSubmit={(e) => applyFilter(e)}>
                <div>
                    <label>Stock Number</label>
                    <input id="stockNumber" placeholder="Search for stock number"></input>
                </div>
                <div>
                    <label>Vehicle</label>
                    <input id="vehicle" placeholder="Search for make, model, year, etc."></input>
                </div>
                <div>
                    <label>Step</label>
                    <select id="step" defaultValue="All">
                        <option>All</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
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
                <table className="portal-table vehicles-table">
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

export default PortalVehicles;