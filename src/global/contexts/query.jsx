import { QueryClientProvider } from "react-query";
import { query } from "../api/tools/query";

export const Instance = ({ children }) => {
  return (
    <QueryClientProvider client={query} contextSharing={true}>
      {children}
    </QueryClientProvider>
  );
};
