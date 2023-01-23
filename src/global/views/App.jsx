import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useUpdateStore } from "../api/user/store";
import { useVerifyQuery } from "../api/user/queries";

import Login from "../routes/Login";
import Panel from "../routes/Panel";
import NotFound from "../routes/NotFound";

const AppView = () => (
  <AppLogic>
    <Routes>
      <Route index element={<Login />} />
      <Route path="panel/*" element={<Panel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppLogic>
);

const AppLogic = ({ children }) => {
  const update = useUpdateStore();
  const verify = useVerifyQuery();

  useEffect(() => {
    if (verify.data && verify.isSuccess) {
      update(verify.data);
    }
  }, [verify.data, verify.isSuccess]);

  return <>{children}</>;
};

export default AppView;
