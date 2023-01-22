import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import loadable from "@loadable/component";

const Settings = loadable(() => import("./Settings"));
const Applications = loadable(() => import("./Applications"));
const Help = loadable(() => import("./Help"));
const Reference = loadable(() => import("./Reference"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/panel") navigate("settings", { replace: true });
  }, []);

  return (
    <Routes>
      <Route path="settings" element={<Settings />} />
      <Route path="applications" element={<Applications />} />
      <Route path="help" element={<Help />} />
      <Route path="reference" element={<Reference />} />
    </Routes>
  );
};

export default App;
