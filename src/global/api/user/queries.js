import api from "./api";
import * as query from "react-query";

export default {
  useLoginQuery: () =>
    query.useMutation({
      mutationFn: (data) => api.login(data),
    }),

  useLogoutQuery: () =>
    query.useMutation({
      mutationFn: (data) => api.logout(data),
    }),

  useVerifyQuery: () => query.useQuery({ queryKey: ["user"], queryFn: api.verify }),

  useUpdateQuery: () =>
    query.useMutation({
      mutationFn: (data) => api.update(data),
    }),
};
