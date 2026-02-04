import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/apiUrl";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Logic to refresh the token or redirect to Login
      } catch (error) {
        console.log("Error refreshing token: ", error);
      }
    }

    // Only show toast for network errors or non-API errors
    // API errors (4xx, 5xx with response) are handled by individual components
    if (!error.response) {
      let errorMessage =
        "Unable to connect to the server. Please check your internet connection or try again later.";
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
