import { Employee } from "@/lib/types/employeeType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export async function fetchEmployeeData(type: string): Promise<Employee[]> {
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
                    ...(type === "new" || type === "active"
                        ? {
                              images: ["https://via.placeholder.com/150"],
                              video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                              audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                          }
                        : {}),
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 0);
    });
}

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

export const fetchNewGrievances = createAsyncThunk(
    "grievance/fetchNewGrievances",
    async (_, { rejectWithValue }) => {
        try {
            const newGrievances = await fetchEmployeeData("new");
            return newGrievances;
        } catch {
            return rejectWithValue(
                "Failed to fetch new grievances. Please try again."
            );
        }
    }
);

const grievanceSlice = createSlice({
    name: "grievance",
    initialState,
    reducers: {
        updateNewGrievanceCount(state, action: PayloadAction<Employee[]>) {
            state.newGrievanceCount = action.payload.length;
            state.newGrievanceData = action.payload;
            state.loadingCount = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewGrievances.pending, (state) => {
                state.isFetching = true;
                state.loadingCount = true;
                state.error = null;
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

export const { updateNewGrievanceCount } = grievanceSlice.actions;
export default grievanceSlice.reducer;
