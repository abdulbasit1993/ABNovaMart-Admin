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
  }
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

    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        errorMessage;
    } else if (error.request) {
      errorMessage =
        "Unable to connect to the server. Please check your internet connection or try again later.";
    } else {
      errorMessage = error.message || errorMessage;
    }

    const finalMessage = Array.isArray(errorMessage)
      ? errorMessage[0]
      : errorMessage;

    toast.error(finalMessage);

    return Promise.reject(error);
  }
);

export default apiClient;
