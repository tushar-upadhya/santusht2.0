import {
    addInstituteThunk,
    fetchInstitutesThunk,
    Institute,
} from "@/api/instituteApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    name: "institutes",
    initialState,
    reducers: {
        restoreInstitutes: (state, action: PayloadAction<Institute[]>) => {
            state.institutes = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstitutesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstitutesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.institutes = action.payload;
            })
            .addCase(fetchInstitutesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addInstituteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addInstituteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.institutes.push(action.payload.data); // Immediately add to state
                console.log("Updated institutes state:", state.institutes);
            })
            .addCase(addInstituteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { restoreInstitutes } = instituteSlice.actions;
export default instituteSlice.reducer;
