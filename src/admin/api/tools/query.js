import { QueryClient } from "react-query";

export const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 2 * 60 * 60,
      cacheTime: 2 * 60 * 60,
    },
  },
});
