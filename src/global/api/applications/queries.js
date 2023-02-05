import api from "./api";
import * as query from "react-query";

export const useCategoriesQuery = () =>
  query.useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

export const useFreeQuery = () =>
  query.useQuery({ queryKey: [`applications`], queryFn: api.getFree });

export const useCreateQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.create(data),
  });

export const useAcceptQuery = () =>
  query.useMutation({
    mutationFn: (data) => api.accept(data),
  });
