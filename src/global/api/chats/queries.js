import api from "./api";
import * as query from "react-query";

export const useChatsQuery = () => query.useQuery({ queryKey: ["chats"], queryFn: api.get });

export const useMessagesQuery = (chatId) =>
  query.useQuery({ queryKey: [`messages-${chatId}`], queryFn: api.messages.bind(api, chatId) });
