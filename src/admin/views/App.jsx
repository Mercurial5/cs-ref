import {useEffect} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {Layout} from "./Layout";

import loadable from "@loadable/component";
import {Navigate} from "react-router-dom";

const Partner = loadable(() => import("../routes/partner/Partner"));
const PartnerAdd = loadable(() => import("../routes/partner/Add"))
const PartnerEdit = loadable(() => import("../routes/partner/Edit"))

const Manager = loadable(() => import("../routes/manager/Manager"));
const ManagerAdd = loadable(() => import("../routes/manager/Add"))
const ManagerEdit = loadable(() => import("../routes/manager/Edit"))

const Client = loadable(() => import("../routes/client/Client"));

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/panel") navigate("partner", {replace: true});
    }, []);

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="partner">
                    <Route index element={<Partner/>}/>
                    <Route path="add" element={<PartnerAdd/>}/>
                    <Route path="edit" element={<PartnerEdit/>}/>
                </Route>
                <Route path="manager">
                    <Route index element={<Manager/>}/>
                    <Route path="add" element={<ManagerAdd/>}/>
                    <Route path="edit" element={<ManagerEdit/>}/>
                </Route>
                <Route path="client">
                    <Route index element={<Client/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/404" replace={true}/>}/>
            </Route>
        </Routes>
    );
};

export default App;
