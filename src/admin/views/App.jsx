import {useEffect} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {Layout} from "./Layout";

import loadable from "@loadable/component";
import {Navigate} from "react-router-dom";

const Partner = loadable(() => import("../routes/Partner"));
const Manager = loadable(() => import("../routes/Manager"));
const Client = loadable(() => import("../routes/Client"));

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/panel") navigate("partner", {replace: true});
    }, []);

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="partner" element={<Partner/>}>
                    <Route path="add" element={<Manager/>}/>
                    <Route path="edit" element={<Partner/>}/>
                </Route>
                <Route path="manager" element={<Manager/>}>
                    <Route path="add" element={<Partner/>}/>
                    <Route path="edit" element={<Partner/>}/>
                </Route>
                <Route path="client" element={<Client/>}>
                    <Route path="add" element={<Partner/>}/>
                    <Route path="edit" element={<Partner/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/404" replace={true}/>}/>
            </Route>
        </Routes>
    );
};

export default App;
