import { guest, user } from "../tools/axios";

export default {
  async create(data) {
    return await user.post(`/applications/`, data);
  },

  async accept(data) {
    return await user.get(`/applications/${data}/take`);
  },

  async getFree() {
    const response = await user.get("/applications/?status=1");
    return response.data;
  },

  async getCategories() {
    const response = await guest.get("/applications/categories/");
    return response.data;
  },
};
