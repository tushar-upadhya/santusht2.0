import authReducer from "@/redux/features/authSlice";
import grievanceReducer from "@/redux/features/grievanceSlice";
import instituteReducer from "@/redux/features/instituteSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        institute: instituteReducer,
        grievance: grievanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
