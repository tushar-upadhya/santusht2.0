import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Institute {
    id?: number;
    name: string;
    nameHindi?: string;
    status: string;
}

interface InstituteState {
    institutes: Institute[];
    loading: boolean;
    error: string | null;
}

const initialState: InstituteState = {
    institutes: [],
    loading: false,
    error: null,
};

const instituteSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {
        addInstitute: (state, action: PayloadAction<Institute>) => {
            state.institutes.push(action.payload);
        },
        setInstitutes: (state, action: PayloadAction<Institute[]>) => {
            state.institutes = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { addInstitute, setInstitutes, setLoading, setError } =
    instituteSlice.actions;
export default instituteSlice.reducer;
