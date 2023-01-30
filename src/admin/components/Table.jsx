import {useNavigate} from "react-router-dom";
import Button from "./Button/Button.jsx";

export default function Table({headers, rows, is_editable = true}) {
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
                <Pagination/>
            </div>

        </>

    )
}


export function Pagination() {
    let active = 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
    let inactive = 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
    return (
        <nav aria-label="Page navigation example" className="absolute inset-x-0 bottom-0">
            <div className="flex justify-center">
                <ul className="inline-flex -space-x-px ">
                    <li>
                        <a href="#" className={`px-3 py-2 ml-0 ${inactive}`}>Previous</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${active}`}>1</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${inactive}`}>2</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${inactive}`}>3</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${inactive}`}>4</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${inactive}`}>5</a>
                    </li>
                    <li>
                        <a href="#" className={`px-3 py-2 ${inactive}`}>Next</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}