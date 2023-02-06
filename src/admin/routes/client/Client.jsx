import Table from "../../components/Table.jsx";
import {SearchForm} from "../../../global/components/Form/Search.jsx";
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUsersListQuery} from "../../api/queries.js";
import {ROLES} from "../../api/index.js";

const ClientView = () => {
    const searchParams = new URLSearchParams(document.location.search)
    let page = searchParams.get('page');
    page = page === null ? 1 : page;

    const query = useUsersListQuery(ROLES.CLIENT, page);
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        if (query.data && query.isSuccess) {
            let users_data = query.data.results;
            let users = []
            for (let i = 0; i < users_data.length; i++) {
                users.push([users_data[i].name, users_data[i].surname, users_data[i].email, users_data[i].phone, users_data[i].email])
            }
            setUsers(users);
            setPages(query.data.total_pages);
        }
    }, [query.data, query.isSuccess]);

    const headers = ['Имя', 'Фамилия', 'Почта', 'Телефон', 'Количество заявок'];

    return (
        <>
            <div className="flex justify-between m-5">
                <SearchForm/>
            </div>

            <Table headers={headers} rows={users} total_pages={pages} current_page={page}/>
        </>
    )
}

export default ClientView;