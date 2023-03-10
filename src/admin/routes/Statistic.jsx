import Table from "../components/Table.jsx";
import {useApplicationsQuery} from "../api/queries.js";
import {useEffect, useState} from "react";

const Statistic = () => {
    const searchParams = new URLSearchParams(document.location.search)
    let page = searchParams.get('page');
    page = page === null ? 1 : page;

    const query = useApplicationsQuery(page);
    const [applications, setApplications] = useState([]);
    const [pages, setPages] = useState(1);

    const headers = ['ID', 'Дата создания', 'Имя клиента', 'Имя менеджера', 'Статус'];

    useEffect(() => {
        if (query.data && query.isSuccess) {
            let applications_data = query.data.results;
            let applications = []

            for (let i = 0; i < applications_data.length; i++) {
                const manager = applications_data[i].manager;

                applications.push([applications_data[i].id, new Date(applications_data[i].created).toLocaleString("ru-RU"), applications_data[i].owner.name, manager ? manager.name : '', applications_data[i].status])
            }
            setApplications(applications);
            setPages(query.data.total_pages);
        }
    }, [query.data, query.isSuccess]);

    return (
        <>
            <h1 className="font-semibold text-2xl px-8 pt-8">Статистика</h1>
            <span className="text-[#7C8DB5] px-8">Здесь вся информация по всем существующим заявкам</span>
            <div className="flex justify-center flex-col p-8 w-full">
                <div
                    className="border border-[#E6EDFF] rounded-xl grid lg:grid-cols-4 lg:grid-rows-1 grid-rows-4 divide-x divide-[#E6EDFF] py-4 ">
                    <Card ClientsNumber="6784" text="Клиентов" icon="users"/>
                    <Card ClientsNumber="10124" text="Выполненных заказов" icon="orders"/>
                    <Card ClientsNumber="114" text="Партнеров" icon="users"/>
                    <Card ClientsNumber="6563" text="Довольных клентов" icon="check"/>
                </div>
                <span className="font-medium text-xl my-6">Список заказов</span>
            </div>

            <Table headers={headers} rows={applications} total_pages={pages} current_page={page}/>

        </>
    );
};


function Card(props) {
    return (
        <div className="flex flex-row justify-between px-4">
            <div className="flex flex-col">
                <span className="text-2xl font-semibold">{props.ClientsNumber}</span>
                <span className="">{props.text}</span>
            </div>
            <div>
                <StatIcon name={props.icon}/>
            </div>
        </div>
    )
}

function StatIcon({name}) {
    let Icon =
        name == "users" ? (
            UsersIcon
        ) : name == "orders" ? (
            OrdersIcon
        ) : name == "check" ? (
            CheckInCircle
        ) : (
            <span/>
        );

    return <Icon/>;
}

function UsersIcon() {
    return (
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_102_90)">
                <rect x="10" y="8.5" width="44" height="44" rx="12" fill="white" shapeRendering="crispEdges"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M26.8499 26.5C26.8499 24.7603 28.2602 23.35 29.9999 23.35C31.7396 23.35 33.1499 24.7603 33.1499 26.5C33.1499 28.2397 31.7396 29.65 29.9999 29.65C28.2602 29.65 26.8499 28.2397 26.8499 26.5ZM29.9999 21.65C27.3213 21.65 25.1499 23.8214 25.1499 26.5C25.1499 29.1786 27.3213 31.35 29.9999 31.35C32.6785 31.35 34.8499 29.1786 34.8499 26.5C34.8499 23.8214 32.6785 21.65 29.9999 21.65ZM24.8499 36.4167C24.8499 36.0136 25.1786 35.4979 26.2183 35.0388C27.2078 34.6018 28.5841 34.35 29.9999 34.35C31.3956 34.35 32.7708 34.6431 33.7678 35.1047C34.2668 35.3357 34.6327 35.5912 34.8629 35.8378C35.0845 36.0752 35.1475 36.2656 35.1498 36.4085C35.1418 36.43 35.105 36.4981 34.9626 36.6088C34.7442 36.7786 34.3796 36.9616 33.8649 37.127C32.8445 37.4549 31.4362 37.65 29.9999 37.65C28.3014 37.65 26.9033 37.4521 25.9612 37.1316C25.4875 36.9704 25.181 36.7955 25.0076 36.6425C24.8488 36.5024 24.8498 36.4286 24.8499 36.4174L24.8499 36.4167ZM35.1518 36.401C35.152 36.401 35.1518 36.403 35.1505 36.4068C35.1509 36.4029 35.1516 36.401 35.1518 36.401ZM29.9999 32.65C28.4157 32.65 26.792 32.927 25.5315 33.4837C24.3213 34.0181 23.1499 34.9607 23.1499 36.4167C23.1499 37.0456 23.4675 37.5507 23.8828 37.9172C24.2876 38.2744 24.8248 38.5406 25.4136 38.741C26.5965 39.1435 28.1984 39.35 29.9999 39.35C31.5636 39.35 33.1553 39.1406 34.385 38.7455C34.9952 38.5494 35.5682 38.2913 36.0059 37.951C36.4403 37.6133 36.8499 37.1034 36.8499 36.4167C36.8499 35.7271 36.536 35.1389 36.1057 34.6778C35.6796 34.2213 35.108 33.8518 34.482 33.562C33.229 32.9819 31.6042 32.65 29.9999 32.65ZM36.1538 30.4185C36.1989 29.9512 36.6142 29.6089 37.0814 29.6539C38.2956 29.7709 39.4221 30.0865 40.2733 30.5788C41.0977 31.0555 41.8499 31.82 41.8499 32.8733C41.8499 33.4192 41.641 33.917 41.2348 34.3126C40.8518 34.6855 40.3291 34.9349 39.7317 35.1043C39.2801 35.2323 38.8102 34.97 38.6821 34.5183C38.5541 34.0667 38.8164 33.5968 39.2681 33.4687C39.7157 33.3418 39.9429 33.1978 40.0487 33.0947C40.1313 33.0143 40.1499 32.9536 40.1499 32.8733C40.1499 32.7166 40.0327 32.4034 39.4223 32.0504C38.8388 31.713 37.9652 31.447 36.9184 31.3461C36.4511 31.301 36.1088 30.8857 36.1538 30.4185ZM37.9999 21.65C37.5305 21.65 37.1499 22.0306 37.1499 22.5C37.1499 22.9694 37.5305 23.35 37.9999 23.35C38.9112 23.35 39.6499 24.0887 39.6499 25C39.6499 25.9113 38.9112 26.65 37.9999 26.65C37.5305 26.65 37.1499 27.0306 37.1499 27.5C37.1499 27.9694 37.5305 28.35 37.9999 28.35C39.8501 28.35 41.3499 26.8501 41.3499 25C41.3499 23.1498 39.8501 21.65 37.9999 21.65Z"
                      fill="#347AE2"/>
            </g>
            <defs>
                <filter id="filter0_d_102_90" x="0" y="0.5" width="64" height="64" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.486275 0 0 0 0 0.552941 0 0 0 0 0.709804 0 0 0 0.12 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_102_90"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_102_90" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

function OrdersIcon() {
    return (
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_102_103)">
                <rect x="10" y="8.5" width="44" height="44" rx="12" fill="white" shapeRendering="crispEdges"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M28.8927 24.7902C28.9593 24.3248 29.1016 24.0681 29.3031 23.8954C29.6384 23.608 30.3628 23.35 31.9999 23.35C33.637 23.35 34.3614 23.608 34.6967 23.8954C34.8985 24.0683 35.0409 24.3256 35.1074 24.7924C34.2012 24.6894 33.1685 24.65 31.9999 24.65C30.8299 24.65 29.7977 24.6896 28.8927 24.7902ZM27.1588 25.1032C27.2027 24.1776 27.4266 23.2647 28.1967 22.6046C29.0281 21.892 30.3036 21.65 31.9999 21.65C33.6962 21.65 34.9717 21.892 35.8031 22.6046C36.5762 23.2673 36.7988 24.1847 36.8415 25.1139C37.7271 25.3609 38.4775 25.7342 39.0803 26.2977C40.2613 27.4016 40.6877 29.0594 40.8091 31.2389C40.8356 31.3212 40.8499 31.4089 40.8499 31.5C40.8499 31.6577 40.8468 31.8169 40.8386 31.9766C40.8465 32.2793 40.8499 32.5911 40.8499 32.9118C40.8499 35.3466 40.532 37.3446 39.0662 38.6541C37.6392 39.929 35.3373 40.35 31.9999 40.35C30.3151 40.35 28.9159 40.268 27.7711 40.0396C26.6221 39.8105 25.6701 39.4227 24.9346 38.7676C23.4552 37.4499 23.1499 35.3222 23.1499 32.5C23.1499 32.2798 23.1518 32.0639 23.1559 31.8522C23.1516 31.7342 23.1499 31.6167 23.1499 31.5C23.1499 31.4331 23.1576 31.368 23.1723 31.3055C23.2644 29.0721 23.6717 27.3571 24.9346 26.2324C25.5352 25.6975 26.2801 25.3408 27.1588 25.1032ZM24.8569 31.841C24.9108 29.4192 25.2796 28.2016 26.0652 27.5019C26.4963 27.118 27.1277 26.8222 28.1037 26.6275C29.0839 26.432 30.3514 26.35 31.9999 26.35C33.6492 26.35 34.9141 26.4322 35.8913 26.633C36.8622 26.8325 37.4891 27.1373 37.9195 27.5396C38.6916 28.2614 39.0645 29.5152 39.1367 31.959C39.1136 32.3253 39.0585 32.6213 38.9612 32.8695C38.8369 33.1867 38.6281 33.4658 38.2261 33.7152C37.3433 34.263 35.5691 34.65 32.0059 34.65C28.4431 34.65 26.6651 34.2631 25.7789 33.7147C25.3749 33.4647 25.1649 33.1851 25.0399 32.8679C24.9319 32.594 24.8754 32.2617 24.8569 31.841ZM38.9825 35.243C38.8013 36.2423 38.4646 36.9119 37.9336 37.3863C37.0273 38.196 35.3292 38.65 31.9999 38.65C30.3514 38.65 29.0839 38.568 28.1037 38.3725C27.1277 38.1778 26.4963 37.882 26.0652 37.4981C25.5476 37.037 25.211 36.3512 25.0261 35.2444C26.3756 36.0116 28.5683 36.35 32.0059 36.35C35.4446 36.35 37.6356 36.0114 38.9825 35.243ZM29.1499 32.5C29.1499 32.0306 29.5305 31.65 29.9999 31.65H33.9999C34.4693 31.65 34.8499 32.0306 34.8499 32.5C34.8499 32.9694 34.4693 33.35 33.9999 33.35L29.9999 33.35C29.5305 33.35 29.1499 32.9694 29.1499 32.5Z"
                      fill="#347AE2"/>
            </g>
            <defs>
                <filter id="filter0_d_102_103" x="0" y="0.5" width="64" height="64" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.486275 0 0 0 0 0.552941 0 0 0 0 0.709804 0 0 0 0.12 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_102_103"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_102_103" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

function CheckInCircle() {
    return (
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_102_116)">
                <rect x="10" y="8.5" width="44" height="44" rx="12" fill="white" shapeRendering="crispEdges"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M23.8499 30.5C23.8499 25.9989 27.4988 22.35 31.9999 22.35C32.8908 22.35 33.7467 22.4926 34.547 22.7557C34.993 22.9023 35.4733 22.6596 35.6199 22.2136C35.7665 21.7676 35.5238 21.2873 35.0778 21.1407C34.1084 20.822 33.0734 20.65 31.9999 20.65C26.5599 20.65 22.1499 25.06 22.1499 30.5C22.1499 35.94 26.5599 40.35 31.9999 40.35C37.4399 40.35 41.8499 35.94 41.8499 30.5C41.8499 30.0306 41.4693 29.65 40.9999 29.65C40.5305 29.65 40.1499 30.0306 40.1499 30.5C40.1499 35.0011 36.501 38.65 31.9999 38.65C27.4988 38.65 23.8499 35.0011 23.8499 30.5ZM39.6022 26.0997C39.9335 25.7671 39.9323 25.2289 39.5996 24.8977C39.267 24.5664 38.7288 24.5676 38.3976 24.9003L32.0495 31.2759L29.6208 28.678C29.3002 28.3351 28.7624 28.317 28.4194 28.6376C28.0765 28.9582 28.0584 29.4961 28.379 29.839L31.4093 33.0805C31.5668 33.249 31.7861 33.3463 32.0168 33.3499C32.2475 33.3535 32.4698 33.2632 32.6325 33.0997L39.6022 26.0997Z"
                      fill="#347AE2"/>
            </g>
            <defs>
                <filter id="filter0_d_102_116" x="0" y="0.5" width="64" height="64" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.486275 0 0 0 0 0.552941 0 0 0 0 0.709804 0 0 0 0.12 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_102_116"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_102_116" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

export default Statistic;