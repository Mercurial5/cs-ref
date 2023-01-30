import { useToken } from "../tools/axios";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export const useChatWebsocket = (events) => {
  const token = useToken();

  const ws = useWebSocket(`${import.meta.env.VITE_WS_URL}/api/chat/?token=${token}`, {
    ...events,
    onMessage: (e) => events?.onMessage(JSON.parse(e.data)),
  });

  return {
    lastMessage: ws.lastJsonMessage,
    sendMessage: ws.sendJsonMessage,
  };
};
