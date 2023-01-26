import { guest, user } from "../tools/axios";

export default {
  async categories() {
    const response = await guest.get("/applications/categories/");
    return response.data;
  },

  async create(data) {
    return await user.post(`/applications/`, data);
  },
};
