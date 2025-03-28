import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://192.168.30.88:8080/santusht/auth";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface LoginResponse {
    fullname: string;
    role: string;
    token: string;
}

export const loginUser = async (credentials: {
    username: string;
    password: string;
}): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
        "/login",
        credentials
    );
    console.log("Login Response:", response.data);
    return response.data;
};

export const loginUserThunk = createAsyncThunk<
    LoginResponse,
    { username: string; password: string },
    { rejectValue: string }
>("auth/loginUser", async ({ username, password }, { rejectWithValue }) => {
    try {
        return await loginUser({ username, password });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
        return rejectWithValue("An unexpected error occurred");
    }
});
