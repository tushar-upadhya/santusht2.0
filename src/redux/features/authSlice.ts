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

const getSessionValue = (key: string) => sessionStorage.getItem(key) || null;

const initialState: AuthState = {
    fullname: getSessionValue("fullname"),
    role: getSessionValue("role"),
    token: getSessionValue("token"),
    isAuthenticated: !!getSessionValue("token"),
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

            ["token", "role", "fullname"].forEach((key) =>
                sessionStorage.removeItem(key)
            );
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
                (state, action: PayloadAction<Partial<AuthState>>) => {
                    const { fullname, role, token } = action.payload;

                    state.fullname = fullname || null;
                    state.role = role || null;
                    state.token = token || null;
                    state.isAuthenticated = !!token;
                    state.loading = false;

                    if (token) {
                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("role", role || "");
                        sessionStorage.setItem("fullname", fullname || "");
                    }
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
