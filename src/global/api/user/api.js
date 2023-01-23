import { guest, user } from "../tools/axios";

export default {
  async login(data) {
    const response = await guest.post("/auth/token/login/", data);
    return response.data;
  },

  async logout() {
    await user.post("/auth/token/logout/");
  },

  async verify() {
    const response = await user.get("/users/me/");
    return response.data;
  },

  async update(data) {
    return await user.patch(`/users/me/`, data);
  },

  async cities() {
    const response = await user.get("/users/cities/");
    return response.data;
  },
};
