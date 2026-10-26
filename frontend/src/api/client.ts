import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

apiClient.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const message =
      error?.response?.data?.detail ||
      error?.message ||
      "Network or server error";
    return Promise.reject({ ...error, message });
  }
);


