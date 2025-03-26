import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Institute {
    id?: number;
    instituteName: string;
    instituteNameHindi?: string;
    location: string;
    status: boolean;
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

// Fetch Institutes
export const fetchInstitutes = createAsyncThunk(
    "institutes/fetchInstitutes",
    async () => {
        const response = await fetch(
            "http://192.168.30.88:8080/santusht/superadmin/add-update-institute"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    }
);

// Add Institute
export const addInstitute = createAsyncThunk(
    "institutes/addInstitute",
    async (institute: Institute, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "http://192.168.30.88:8080/santusht/superadmin/add-update-institute",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(institute),
                }
            );
            if (!response.ok) throw new Error("Failed to add institute");
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const instituteSlice = createSlice({
    name: "institutes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstitutes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInstitutes.fulfilled, (state, action) => {
                state.loading = false;
                state.institutes = action.payload;
            })
            .addCase(fetchInstitutes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addInstitute.fulfilled, (state, action) => {
                state.institutes.push(action.payload);
            });
    },
});

export default instituteSlice.reducer;
