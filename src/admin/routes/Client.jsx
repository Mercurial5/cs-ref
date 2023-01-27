import Table from "../components/Table.jsx";
import {SearchForm} from "../../global/components/Form/Search.jsx";
import Button from "../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const ClientView = () => {
    const headers = ['Имя', 'Почта', '123', '123', '123', 'Редактировать'];
    const rows = [
        ['AIT', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AIT', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AIT', 'TOO', 95, 12313123, 'aitu@gmail.com']
    ];

    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between m-5">
                <SearchForm/>

                <Button icon="plus" text="Добавить Менеджера" onClick={() => navigate("/panel/add")}/>
            </div>

            <Table headers={headers} rows={rows} edit_path="panel/client/edit"/>
        </>
    )
}

export default ClientView;