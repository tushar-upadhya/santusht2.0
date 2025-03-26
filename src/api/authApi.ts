import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginResponse {
    fullname: string;
    role: string;
    token: string;
}

const BASE_URL = "http://192.168.30.88:8080/santusht/auth";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export const loginUser = async (credentials: {
    username: string;
    password: string;
}): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
        "/login",
        credentials
    );
    return response.data;
};

export const loginUserThunk = createAsyncThunk<
    LoginResponse,
    { username: string; password: string },
    { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        return await loginUser(credentials);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Invalid credentials"
            );
        }
        return rejectWithValue("Network error occurred");
    }
});
