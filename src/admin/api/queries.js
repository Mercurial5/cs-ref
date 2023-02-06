import api from "./api";
import * as query from "react-query";

export const useUsersListQuery = (role, page) =>
    query.useQuery({ queryKey: [`users-${role}-${page}`], queryFn: api.users.bind(api, role, page) });

export const useApplicationsQuery = (page) =>
    query.useQuery({
        queryKey: "applications",
        queryFn: api.applications.bind(api, page),
    });

export const useCreateUserQuery = () =>
    query.useMutation({
        mutationFn: (data) => api.create(data),
    });
