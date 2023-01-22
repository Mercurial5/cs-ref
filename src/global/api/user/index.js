import React from "react";
import store from "./store";
import queries from "./queries";
import { token } from "../tools/axios";
import { useNavigate } from "react-router-dom";

export { store };
export { queries };

export const actions = {
  login(query, data) {
    if (!data.email || !data.password) return;
    query.mutate(data);
  },
};

export const scripts = {
  login() {
    const navigate = useNavigate();
    const login = queries.useLoginQuery();

    React.useEffect(() => {
      if (login.data) {
        token.update(login.data.auth_token);
        navigate("/panel", { replace: false });
      }
    }, [login.data]);

    return {
      query: login,
      handle: actions.login.bind(actions, login),
    };
  },

  verify() {
    const update = store.useUpdateStore();
    const verify = queries.useVerifyQuery();

    React.useEffect(() => {
      if (verify.data) {
        update(verify.data);
      }
    }, [verify.data]);
  },
};

export const ROLES = {
  ADMIN: 1,
  MANAGER: 2,
  CLIENT: 3,
  COMPANY: 4,
  PARTNER: 5,
};
