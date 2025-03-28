import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import instituteReducer from "./features/instituteSlice";

export const store = configureStore({
    reducer: {
        institutes: instituteReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
