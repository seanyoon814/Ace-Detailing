import "./PortalVehicles.css";

import { useEffect, useState } from "react";
import axios from "axios";
import backend from "../../constants/backend";
import httpClient  from '../../features/httpClient';
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import {
    createColumnHelper,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { nextTick } from "process";

const { apiUrl } = backend;


function PortalVehicles() {
    const navigate = useNavigate();
    

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 12, // default page size
    });

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
            cell: info => <img src={info.getValue()[0]} />,
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

    // todo: add pagination and fix vehicle schema in backend
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    async function getData(setData: Function) {
        try {
            const result = await httpClient.get(`${apiUrl}/vehicles`);
            setData(result.data);
        } catch(error) { // Catch invalid token
            if(error?.response.status === 401 || error?.response.status === 403){ 
                // 401 Unauthorized wrong header or 403 Invalid, token expired
                await toast.error("Unauthorized.");
                navigate('/user');
            } else {
                console.error("Error:", error);
            }
        }
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

    useEffect(() => {
        // httpClient.getVehiclesData(setData);
        getData(setData);
    }, []);

    return (
        <>
            <div>
                <h3>Vehicles</h3>
                <button>CREATE NEW</button>
            </div>
            <form className="vehicles-filter" onSubmit={(e) => applyFilter(e)}>
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
            <section className="vehicles-table-container">
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
                <table className="vehicles-table">
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