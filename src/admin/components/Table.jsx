import {useNavigate} from "react-router-dom";
import Button from "./Button/Button.jsx";
import ReactPaginate from 'react-paginate';

import React, { useState, useEffect } from 'react';

export default function Table({headers, rows, total_pages, is_editable = true}) {
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
        if (is_editable) {
            row.push(<td className="flex justify-center mt-2"><Button onClick={() => navigate("edit")} icon="edit"
                                                                      text="Редактировать"/></td>)
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

            <div className="relative h-full mb-10">
                <Pagination total_pages={total_pages}/>
            </div>

        </>

    )
}

export function Pagination({total_pages}) {

const [Rows, SetRows] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [RowsPerPage] = useState(10);

const indexOfLastRow = currentPage * RowsPerPage;
const indexOfFirstRow = indexOfLastRow - RowsPerPage;
const currentRows = Rows.slice(indexOfFirstRow, indexOfLastRow);


    const nextPage = () => {
        if(currentPage !== total_pages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }

    const pageNumbers = [...Array(total_pages + 1).keys()].slice(1)
    
    let active = 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
    let inactive = 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';

    return (
        <nav aria-label="Page navigation example" className="absolute inset-x-0 bottom-0">
            <div className="flex justify-center">
                <ul className="pagination inline-flex -space-x-px ">
                    <li>
                        <a href="#" onClick={prevPage} className={`px-3 py-2 ml-0 ${inactive}`}>Previous</a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                        className={`page-item ${currentPage==pgNumber ? active : ''}`}>
                            <a onClick={() => setCurrentPage(pgNumber)} href={`?page=${pgNumber}`} className="page-item px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {pgNumber}</a>
                        </li>
                    ))}
                    
                    <li>
                        <a href="#" onClick={nextPage} className={`px-3 py-2 ${inactive}`}>Next</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}