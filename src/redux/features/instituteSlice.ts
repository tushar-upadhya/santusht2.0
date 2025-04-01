import {
    addAdminThunk,
    addInstituteThunk,
    Admin,
    fetchInstitutesThunk,
    Institute,
} from "@/api/instituteApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InstituteState {
    institutes: Institute[];
    admins: Admin[];
    loading: boolean;
    error: string | null;
}

const initialState: InstituteState = {
    institutes: [],
    admins: [],
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
        restoreAdmins: (state, action: PayloadAction<Admin[]>) => {
            state.admins = action.payload;
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
                state.error = null; // Reset error
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
                state.institutes.push(action.payload.data);
                state.error = null; // Reset error
            })
            .addCase(addInstituteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addAdminThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAdminThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.admins.push(action.payload.data);
                state.error = null; // Reset error
            })
            .addCase(addAdminThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { restoreInstitutes, restoreAdmins } = instituteSlice.actions;
export default instituteSlice.reducer;
