import authReducer from "@/redux/features/authSlice";
import instituteReducer from "@/redux/features/instituteSlice";
import { configureStore } from "@reduxjs/toolkit";
import grievanceReducer from "./features/grievanceSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        institute: instituteReducer,
        grievance: grievanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
