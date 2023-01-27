import {useNavigate} from "react-router-dom";
import Button from "./Button/Button.jsx";

export default function Table({headers, rows, edit_path}) {
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
        row.push(<td className="flex justify-center mt-2"><Button onClick={() => navigate(edit_path)} icon="edit"
                                                                  text="Редактировать"/></td>)
        table_rows.push(<tr className="h-14 border-b">{row}</tr>);
    }


    return (
        <table className="text-xs lg:text-sm m-5 border">
            <thead className="bg-[#F4F3F3] text-black/50 text-medium lg:text-sm text-xs uppercase h-10">
            <tr>
                {table_headers}
            </tr>
            </thead>
            <tbody className="text-center">
            {table_rows}
            </tbody>
        </table>
    )
}
