import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { SideLayout } from "./SideLayout";

import loadable from "@loadable/component";
import { Navigate } from "react-router-dom";

const Settings = loadable(() => import("../routes/Settings"));
const Chats = loadable(() => import("../routes/Chats"));
const Help = loadable(() => import("../routes/Help"));
const Reference = loadable(() => import("../routes/Reference"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/panel") navigate("settings", { replace: true });
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="settings" element={<Settings />} />
        <Route element={<SideLayout />}>
          <Route path="chats" element={<Chats />} />
        </Route>
        <Route path="help" element={<Help />} />
        <Route path="reference" element={<Reference />} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Route>
    </Routes>
  );
};

export default App;
