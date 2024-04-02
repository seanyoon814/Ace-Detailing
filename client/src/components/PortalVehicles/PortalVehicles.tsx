import "./PortalVehicles.css";

import { useEffect, useState } from "react";
import axios from "axios";
import backend from "../../constants/backend";

import {
    createColumnHelper,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";

const { apiUrl } = backend;

async function getData(setData: Function) {
    const result = await axios(`${apiUrl}/vehicles`);
    setData(result.data);
}

function PortalVehicles() {

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const columnHelper = createColumnHelper<any>();
    const columns = [
        columnHelper.accessor("step", {
            header: "Step",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("imageUrl", {
            header: "Image",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("stockNumber", {
            header: "Stock Number",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("vehicle", {
            header: "Vehicle",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("notes", {
            header: "Notes",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("createdAt", {
            header: "Created At",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("modifiedAt", {
            header: "Modified At",
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ];

    // todo: add pagination and fix vehicle schema in backend
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    useEffect(() => {
        getData(setData);
    }, []);

    return (
        <>
            <div>
                <h3>Vehicles</h3>
                <button>CREATE NEW</button>
            </div>
            <section className="vehicles-filter">
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
                    <select id="step">
                        <option selected>All</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <label>Placeholder</label>
                    <button>FILTER</button>
                </div>
            </section>
            <section className="vehicles-table-container">
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
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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