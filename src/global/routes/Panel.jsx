import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyQuery } from "../api/user/queries";
import { useStore } from "../api/user/store";
import { ROLES } from "../api/user";

import ClientApp from "../../client/views/App";

const PanelLogic = () => {
  const navigate = useNavigate();
  const verify = useVerifyQuery();

  useEffect(() => {
    if (!verify.data && !verify.isLoading) {
      navigate("/", { replace: true });
    }
  }, [verify.data, verify.isLoading]);

  const user = useStore();

  if (user) {
    switch (user.role) {
      case ROLES.CLIENT:
        return <ClientApp />;
    }
  }

  return <div className="px-5 sm:px-8 py-8 text-medium">Загрузка...</div>;
};

export default PanelLogic;
