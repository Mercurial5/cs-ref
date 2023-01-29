import {useNavigate} from "react-router-dom";
import {SearchForm} from "../../../global/components/Form/Search.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useUsersListQuery} from "../../api/queries.js";
import {ROLES} from "../../api/index.js";


const PartnerView = () => {
    const query = useUsersListQuery(ROLES.PARTNER, 1);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (query.data && query.isSuccess) {
            let users = []
            for (let i = 0; i < query.data.length; i++) {
                users.push([query.data[i].company_name, query.data[i].company_type, query.data[i].code, query.data[i].IIN, query.data[i].email])
            }
            setUsers(users);
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

            <Table headers={headers} rows={users}/>

        </>
    )
}


export default PartnerView;