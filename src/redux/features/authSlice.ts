import { LoginResponse, loginUserThunk } from "@/api/authApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    fullname: string | null;
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const syncSessionStorage = (state: AuthState) => {
    const keys = ["token", "role", "fullname"] as const;
    if (state.token) {
        keys.forEach((key) => sessionStorage.setItem(key, state[key] || ""));
    } else {
        keys.forEach((key) => sessionStorage.removeItem(key));
    }
};

const getInitialState = (): AuthState => {
    const token = sessionStorage.getItem("token");
    return {
        fullname: sessionStorage.getItem("fullname"),
        role: sessionStorage.getItem("role"),
        token,
        isAuthenticated: !!token,
        loading: false,
        error: null,
    };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<LoginResponse>) => {
            const { fullname, role, token } = action.payload;
            state.fullname = fullname;
            state.role = role;
            state.token = token;
            state.isAuthenticated = true;
            syncSessionStorage(state);
        },
        logout: (state) => {
            state.fullname = null;
            state.role = null;
            state.token = null;
            state.isAuthenticated = false;
            syncSessionStorage(state);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUserThunk.fulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    const { fullname, role, token } = action.payload;
                    state.fullname = fullname;
                    state.role = role;
                    state.token = token;
                    state.isAuthenticated = true;
                    state.loading = false;
                    syncSessionStorage(state);
                }
            )
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    },
});

export const { setAuthData, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
