import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://192.168.30.88:8080/santusht";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptors unchanged...
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        // console.log(
        //     `[${config.method?.toUpperCase()}] Token from sessionStorage:`,
        //     token
        // );
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log(
            //     `[${config.method?.toUpperCase()}] Request URL:`,
            //     `${BASE_URL}${config.url}`
            // );
            // console.log(
            //     `[${config.method?.toUpperCase()}] Headers:`,
            //     config.headers
            // );
            if (config.method === "post") {
                // console.log("POST Request Body:", config.data);
            }
        } else {
            // console.warn(
            //     `[${config.method?.toUpperCase()}] No token found in sessionStorage`
            // );
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log(
        //     `[${response.config.method?.toUpperCase()}] Response:`,
        //     response.data
        // );
        return response;
    },
    (error) => {
        // console.error(
        //     `[${error.config.method?.toUpperCase()}] API Error:`,
        //     error.response?.data || error.message
        // );
        return Promise.reject(error);
    }
);

export interface Institute {
    id?: number;
    name: string;
    nameHindi?: string;
    status: string;
}

interface ThunkAPI {
    rejectValue: string;
}

export const addInstituteAPI = async (institute: {
    instituteName: string;
    instituteNameHindi?: string;
    status: boolean;
}) => {
    const payload = {
        name: institute.instituteName,
        nameHindi: institute.instituteNameHindi || "",
        status: institute.status ? "Active" : "Inactive",
    };
    const response = await axiosInstance.post<{
        status: string;
        message: string;
        data: Institute;
        errorCode: null | string;
    }>("/superadmin/add-update-institute", payload);
    return response.data;
};

export const addInstituteThunk = createAsyncThunk<
    {
        status: string;
        message: string;
        data: Institute;
        errorCode: null | string;
    },
    { instituteName: string; instituteNameHindi?: string; status: boolean },
    ThunkAPI
>("institutes/addInstitute", async (institute, { rejectWithValue }) => {
    try {
        return await addInstituteAPI(institute);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add institute"
            );
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

// Updated fetchInstitutesAPI
export const fetchInstitutesAPI = async () => {
    const response = await axiosInstance.post<Institute[]>(
        "superadmin/add-update-institute",
        {}
    );
    return response.data;
};

export const fetchInstitutesThunk = createAsyncThunk<
    Institute[],
    void,
    ThunkAPI
>("institutes/fetchInstitutes", async (_, { rejectWithValue }) => {
    try {
        return await fetchInstitutesAPI();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch institutes"
            );
        }
        return rejectWithValue("An unexpected error occurred");
    }
});
