import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../api/user";

import Component from "./ui";

const Login = () => {
  const user = store.useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/panel", { replace: true });
  }, [user]);

  return <Component />;
};

export default Login;
