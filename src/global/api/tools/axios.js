import axios from "axios";

export const guest = axios.create({
  baseURL: `${import.meta.env.VITE_PROXY_URL}/api`,
});

export const user = axios.create({
  baseURL: `${import.meta.env.VITE_PROXY_URL}/api`,
});

export const token = {
  value: localStorage.getItem("token") ?? "",
  update(value) {
    this.value = value;
    localStorage.setItem("token", value);
  },
};

user.interceptors.request.use((request) => {
  request.headers.Authorization = `Token ${token.value}`;
  return request;
});
