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

const getSessionValue = (key: string) => sessionStorage.getItem(key);

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
            Object.assign(state, {
                fullname: null,
                role: null,
                token: null,
                isAuthenticated: false,
            });
            ["token", "role", "fullname"].forEach(sessionStorage.removeItem);
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
                (state, action: PayloadAction<AuthState>) => {
                    const { fullname, role, token } = action.payload;
                    Object.assign(state, {
                        fullname,
                        role,
                        token,
                        isAuthenticated: true,
                        loading: false,
                    });
                    Object.entries({ token, role, fullname }).forEach(
                        ([key, value]) => sessionStorage.setItem(key, value!)
                    );
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
