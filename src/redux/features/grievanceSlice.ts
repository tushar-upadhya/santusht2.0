// src/redux/features/grievanceSlice.ts
import { Employee } from "@/lib/types/employeeType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mock fetch function (same as before)
async function fetchEmployeeData(type: string): Promise<Employee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array(Math.floor(Math.random() * 20) + 1)
                .fill({
                    refNo: `EMP-${type.toUpperCase()}-${Math.floor(
                        Math.random() * 1000
                    )}`,
                    location: "New York",
                    description: `${type} Task`,
                    lastUpdate: "2024-11-15",
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 1500);
    });
}

// Define the state shape
interface GrievanceState {
    newGrievanceCount: number;
    newGrievanceData: Employee[];
    loadingCount: boolean;
    error: string | null;
    isFetching: boolean;
}

const initialState: GrievanceState = {
    newGrievanceCount: 0,
    newGrievanceData: [],
    loadingCount: true,
    error: null,
    isFetching: false,
};

// Async thunk to fetch new grievances
export const fetchNewGrievances = createAsyncThunk(
    "grievance/fetchNewGrievances",
    async (_, { rejectWithValue }) => {
        try {
            const newGrievances = await fetchEmployeeData("new");
            return newGrievances;
        } catch (error) {
            return rejectWithValue(
                "Failed to fetch new grievances. Please try again."
            );
        }
    }
);

const grievanceSlice = createSlice({
    name: "grievance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewGrievances.pending, (state) => {
                if (!state.isFetching) {
                    state.isFetching = true;
                    state.loadingCount = true;
                    state.error = null;
                }
            })
            .addCase(
                fetchNewGrievances.fulfilled,
                (state, action: PayloadAction<Employee[]>) => {
                    state.newGrievanceCount = action.payload.length;
                    state.newGrievanceData = action.payload;
                    state.loadingCount = false;
                    state.isFetching = false;
                }
            )
            .addCase(fetchNewGrievances.rejected, (state, action) => {
                state.newGrievanceCount = 0;
                state.newGrievanceData = [];
                state.loadingCount = false;
                state.isFetching = false;
                state.error = action.payload as string;
            });
    },
});

export default grievanceSlice.reducer;
