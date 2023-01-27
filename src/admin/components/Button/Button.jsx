export default function Button(props) {
    return (
        <button onClick={props.onClick}
                className="bg-[#007282] text-white w-fit rounded-xl  text-xs lg:text-sm px-4 py-2 flex flex-row "
                type={props.type}>
            {props.icon ? (<ButtonIcon name={props.icon}/>) : null}
            {props.text}
        </button>
    )
}


function PlusIcon() {
    return (
        <div className="p-1 pr-2">
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.71432 1.5625C5.71432 1.2168 5.39512 0.9375 5.00004 0.9375C4.60495 0.9375 4.28575 1.2168 4.28575 1.5625V4.375H1.07146C0.676374 4.375 0.357178 4.6543 0.357178 5C0.357178 5.3457 0.676374 5.625 1.07146 5.625H4.28575V8.4375C4.28575 8.7832 4.60495 9.0625 5.00004 9.0625C5.39512 9.0625 5.71432 8.7832 5.71432 8.4375V5.625H8.92861C9.3237 5.625 9.64289 5.3457 9.64289 5C9.64289 4.6543 9.3237 4.375 8.92861 4.375H5.71432V1.5625Z"
                    fill="white"/>
            </svg>
        </div>
    )
}

function EditIcon() {
    return (
        <div className="pr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 4.99999H6C5.46957 4.99999 4.96086 5.21071 4.58579 5.58578C4.21071 5.96085 4 6.46956 4 6.99999V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13M17.586 3.58599C17.7705 3.39497 17.9912 3.24261 18.2352 3.13779C18.4792 3.03297 18.7416 2.9778 19.0072 2.97549C19.2728 2.97319 19.5361 3.02379 19.7819 3.12435C20.0277 3.22491 20.251 3.37342 20.4388 3.5612C20.6266 3.74899 20.7751 3.97229 20.8756 4.21809C20.9762 4.46388 21.0268 4.72724 21.0245 4.9928C21.0222 5.25836 20.967 5.5208 20.8622 5.7648C20.7574 6.00881 20.605 6.2295 20.414 6.41399L11.828 15H9V12.172L17.586 3.58599Z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

function ButtonIcon({name}) {
    let Icon =
        name === "plus" ? (
            PlusIcon
        ) : name === "edit" ? (
            EditIcon
        ) : (
            <span/>
        );

    return <Icon/>;
}