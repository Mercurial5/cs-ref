import Table from "../../components/Table.jsx";
import {SearchForm} from "../../../global/components/Form/Search.jsx";
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUsersListQuery} from "../../api/queries.js";
import {ROLES} from "../../api/index.js";

const ClientView = () => {
    const query = useUsersListQuery(ROLES.CLIENT, 1);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (query.data && query.isSuccess) {
            let users = []
            for (let i = 0; i < query.data.length; i++) {
                users.push([query.data[i].name, query.data[i].surname, query.data[i].email, query.data[i].phone, query.data[i].email])
            }
            setUsers(users);
        }
    }, [query.data, query.isSuccess]);

    const headers = ['Имя', 'Фамилия', 'Почта', 'Телефон', 'Количество заявок', 'Редактировать'];
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
            </div>

            <Table headers={headers} rows={users}/>
        </>
    )
}

export default ClientView;