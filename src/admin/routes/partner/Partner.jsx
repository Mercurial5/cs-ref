import {useNavigate} from "react-router-dom";
import {SearchForm} from "../../../global/components/Form/Search.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button/Button.jsx";


const PartnerView = () => {
    const headers = ['Наименование', 'Форма организации', 'Код', 'ИИН', 'Почта', 'Редактировать'];
    const rows = [
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
        ['AITU', 'TOO', 95, 12313123, 'aitu@gmail.com'],
    ];

    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between m-5">
                <SearchForm/>

                <Button icon="plus" text="Добавить партнера" onClick={() => navigate("/panel/partner/add")}/>
            </div>

            <Table headers={headers} rows={rows}/>

        </>
    )
}


export default PartnerView;