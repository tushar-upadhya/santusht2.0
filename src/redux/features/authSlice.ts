import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    role: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// API Base URL
const BASE_URL = "http://192.168.30.88:8080/santusht/auth";

// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log("Login Success:", response.data); // Debug log
            return response.data;
        } catch (error: any) {
            console.error(
                "Login Error:",
                error.response?.data || error.message
            );
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.role = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.role = action.payload.role;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                    state.loading = false;

                    // Save to localStorage
                    localStorage.setItem("token", action.payload.token);
                    localStorage.setItem("role", action.payload.role);
                }
            )
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
