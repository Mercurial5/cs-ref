import {useNavigate} from "react-router-dom";
import {SearchForm} from "../../../global/components/Form/Search.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useUsersListQuery} from "../../api/queries.js";
import {ROLES} from "../../api/index.js";


const PartnerView = () => {
    const searchParams = new URLSearchParams(document.location.search)
    let page = searchParams.get('page');
    page = page === null ? 1 : page;

    const query = useUsersListQuery(ROLES.PARTNER, page);
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        if (query.data && query.isSuccess) {
            let users_data = query.data.results;
            let users = []
            for (let i = 0; i < users_data.length; i++) {
                users.push([users_data[i].company_name, users_data[i].company_type, users_data[i].code, users_data[i].IIN, users_data[i].email])
            }
            setUsers(users);
            setPages(query.data.total_pages);
        }
    }, [query.data, query.isSuccess]);

    const headers = ['Наименование', 'Форма организации', 'Код', 'ИИН', 'Почта', 'Редактировать'];

    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between m-5">
                <SearchForm/>

                <Button icon="plus" text="Добавить партнера" onClick={() => navigate("/panel/partner/add")}/>
            </div>

            <Table headers={headers} rows={users} total_pages={pages} current_page={page}/>

        </>
    )
}


export default PartnerView;