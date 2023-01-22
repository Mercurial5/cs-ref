import { Route, Routes } from "react-router-dom";
import * as user from "../api/user";

import Login from "./Login";
import Panel from "./Panel";
import NotFound from "./NotFound";

const App = () => {
  user.scripts.verify();

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="panel/*" element={<Panel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
