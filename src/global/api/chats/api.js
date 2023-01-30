import { user } from "../tools/axios";

export default {
  async get() {
    const response = await user.get("/chats/");
    return response.data;
  },

  async messages(id) {
    if (!id) return;
    const response = await user.get(`/chats/${id}/messages/`);
    return response.data;
  },
};
