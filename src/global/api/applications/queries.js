import api from "./api";
import * as query from "react-query";

export const useCategoriesQuery = () =>
  query.useQuery({ queryKey: ["categories"], queryFn: api.categories });

export const useCreateQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.create(data),
  });
