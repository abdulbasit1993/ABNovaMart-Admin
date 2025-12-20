import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3002/api",
    headers: {
        "Content-Type": "application/json",
    }
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
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Logic to refresh the token or redirect to Login
                
            } catch (error) {
           console.log('Error refreshing token: ', error)     
            }


        }

        return Promise.reject(error);
    }
);

export default apiClient;