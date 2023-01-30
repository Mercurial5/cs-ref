import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {SideBarLayout} from "./SideBarLayout.jsx";

const LayoutView = () => {
    return (
        <div className="min-h-screen bg-slate-200 flex flex-col">
            <Header/>

            <div className="flex-grow flex flex-col">
                <div className="flex flex-1 overflow-hidden h-screen mt-8 pb-6 pl-8">
                    <SideBarLayout/>
                    <div className="hidden lg:flex md:flex flex-col lg:w-4/5 md:w-4/5 sm:w-4/5 xs:w-4/5 bg-white shadow-md rounded-xl mr-4">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {LayoutView as Layout};
