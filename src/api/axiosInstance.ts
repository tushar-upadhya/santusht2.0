import axios from "axios";

export const BASE_URL = "http://192.168.30.88:8080/santusht";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        // console.log(
        //     `[${config.method?.toUpperCase()}] Request URL:`,
        //     `${BASE_URL}${config.url}`
        // );
        // console.log(
        //     `[${config.method?.toUpperCase()}] Token from sessionStorage:`,
        //     token
        // );
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log(
            //     `[${config.method?.toUpperCase()}] Headers:`,
            //     config.headers
            // );
        } else {
            console.warn(
                `[${config.method?.toUpperCase()}] No token found in sessionStorage`
            );
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.error(
        //     `[${error.config.method?.toUpperCase()}] API Error:`,
        //     error.response?.data || error.message
        // );
        return Promise.reject(error);
    }
);

export default axiosInstance;
