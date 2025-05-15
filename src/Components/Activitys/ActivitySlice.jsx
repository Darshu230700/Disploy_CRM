import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DELETE_ACTIVITY, GET_ACTIVITY, UPDATE_MARKAS_ACTIVITY } from "../Common/API";
import toast from "react-hot-toast";



export const GetActivity = createAsyncThunk("ActivityMaster/GetActivity", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(GET_ACTIVITY, payload, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error?.response) {
            toast.error(error?.response?.data?.message);
            throw error?.response?.data?.message
        }
    }
}
);

export const deleteActivity = createAsyncThunk("ActivityMaster/deleteActivity", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams({ ActivityID: payload }).toString();
        const response = await axios.get(`${DELETE_ACTIVITY}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });

        return response.data;
    } catch (error) {
        console.log(error)
    }
})

export const getMarkAsActivity = createAsyncThunk("ActivityMaster/getMarkAsActivity", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${UPDATE_MARKAS_ACTIVITY}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to  data");
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: '',
    getAllActivity: [],
    getActivity: []
}


const ActivitySlice = createSlice({
    name: "ActivityMaster", initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null
        }
    },

    extraReducers: (builder) => {

        builder.addCase(GetActivity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(GetActivity.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllActivity = payload?.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(GetActivity.rejected, (state, { payload }) => {
            state.loading = false;
            state.getAllActivity = null;
            state.error = payload ?? null;

        });

        builder.addCase(deleteActivity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteActivity.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "";
            state.message = action.payload.message || "This operation successFully";
        });
        builder.addCase(deleteActivity.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            state.message = action.error.message || "Failed to data";
        });

        builder.addCase(getMarkAsActivity.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMarkAsActivity.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(getMarkAsActivity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })

    }
})


export const { resetStatus } = ActivitySlice.actions
export default ActivitySlice.reducer