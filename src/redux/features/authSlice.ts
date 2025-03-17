import { loginUser } from "@/api/authApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    fullname: string | null;
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    fullname: sessionStorage.getItem("fullname") || null,
    role: sessionStorage.getItem("role") || null,
    token: sessionStorage.getItem("token") || null,
    isAuthenticated: !!sessionStorage.getItem("token"),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.fullname = null;
            state.role = null;
            state.token = null;
            state.isAuthenticated = false;

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("fullname");
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
                (
                    state,
                    action: PayloadAction<{
                        token: string;
                        role: string;
                        fullname: string;
                    }>
                ) => {
                    console.log("Login Payload:", action.payload); // ✅ Debug payload

                    state.fullname = action.payload.fullname; // Ensure correct key usage
                    state.role = action.payload.role;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                    state.loading = false;

                    sessionStorage.setItem("token", action.payload.token);
                    sessionStorage.setItem("role", action.payload.role);
                    sessionStorage.setItem("fullname", action.payload.fullname);
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
