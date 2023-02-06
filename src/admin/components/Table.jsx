import {useNavigate} from "react-router-dom";
import Button from "./Button/Button.jsx";
import ReactPaginate from 'react-paginate';

import React, {useState, useEffect} from 'react';

export default function Table({headers, rows, current_page, total_pages, is_editable = true}) {
    const navigate = useNavigate();

    const table_headers = [];
    for (let i = 0; i < headers.length; i++) {
        table_headers.push(<th scope="col">{headers[i]}</th>)
    }

    const table_rows = [];
    for (let i = 0; i < rows.length; i++) {
        const row = [];
        for (let j = 0; j < rows[i].length; j++) {
            row.push(<td>{rows[i][j]}</td>)
        }

        table_rows.push(<tr className={`h-14 ${i !== rows.length - 1 ? 'border-b' : ''}`}>{row}</tr>);
    }


    return (
        <>
            <div className="rounded-xl bg-white text-xs lg:text-sm border m-5">
                <table className="w-full">
                    <thead className="text-black/50 text-regular lg:text-sm text-xs border-b uppercase h-10">
                    <tr>
                        {table_headers}
                    </tr>
                    </thead>
                    <tbody className="text-center h-10">
                    {table_rows}
                    </tbody>
                </table>
            </div>

            <div className="h-full mb-10">
                <Pagination current_page={current_page} total_pages={total_pages}/>
            </div>

        </>

    )
}

export function Pagination({current_page, total_pages}) {

    const [Rows, SetRows] = useState([]);
    const [RowsPerPage] = useState(10);

    const indexOfLastRow = current_page * RowsPerPage;
    const indexOfFirstRow = indexOfLastRow - RowsPerPage;
    const currentRows = Rows.slice(indexOfFirstRow, indexOfLastRow);


    const pageNumbers = [...Array(total_pages + 1).keys()].slice(1)

    let active = 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
    let inactive = 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';

    return (
        <nav aria-label="Page navigation example" className="inset-x-0 bottom-0">
            <div className="flex justify-center">
                <ul className="pagination inline-flex -space-x-px ">
                    <li>
                        <a href={`?page=${current_page - 1}`} className={`px-3 py-2 ml-0 ${inactive}`}>Previous</a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                            className="page-item">
                            <a href={`?page=${pgNumber}`}
                               className={`page-item px-3 py-2 ${current_page === pgNumber ? active : inactive}`}>{pgNumber}</a>
                        </li>
                    ))}

                    <li>
                        <a href={`?page=${current_page + 1}`} className={`px-3 py-2 ${inactive}`}>Next</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}