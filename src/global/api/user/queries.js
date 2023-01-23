import api from "./api";
import * as query from "react-query";
import { query as client } from "../tools/query";

export const useLoginQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.login(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["user"] }),
  });

export const useLogoutQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.logout(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["user"] }),
  });

export const useVerifyQuery = () => query.useQuery({ queryKey: ["user"], queryFn: api.verify });

export const useUpdateQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.update(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["user"] }),
  });

export const useCitiesQuery = () => query.useQuery({ queryKey: ["cities"], queryFn: api.cities });
