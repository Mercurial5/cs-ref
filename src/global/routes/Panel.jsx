import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { queries, store, ROLES } from "../api/user";

import ClientApp from "../../client/routes/App";

const Panel = () => {
  const navigate = useNavigate();
  const verify = queries.useVerifyQuery();

  useEffect(() => {
    if (!verify.data && !verify.isLoading) {
      navigate("/", { replace: true });
    }
  }, [verify.data, verify.isLoading]);

  const user = store.useStore();

  if (user) {
    switch (user.role) {
      case ROLES.CLIENT:
        return <ClientApp />;
    }
  }

  return <div className="px-5 sm:px-8 py-8 text-medium">Загрузка...</div>;
};

export default Panel;
