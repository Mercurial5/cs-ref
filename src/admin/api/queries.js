import api from "./api";
import * as query from "react-query";


export const useUsersListQuery = (role, page) =>
    query.useQuery({queryKey: [`users-${role}-${page}`], queryFn: api.users.bind(api, role, page)});