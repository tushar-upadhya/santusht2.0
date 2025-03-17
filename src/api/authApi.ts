import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://192.168.30.88:8080/santusht/auth";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                username,
                password,
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);
