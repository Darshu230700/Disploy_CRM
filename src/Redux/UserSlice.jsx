import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_ROLE_LIST, USERS_ROLE } from "../Components/Common/API";

export const handleUserRole = createAsyncThunk("UserMaster/handleUserRole", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(USERS_ROLE, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getUserRoleList = createAsyncThunk("UserMaster/getUserRoleList", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;

        const response = await axios.post(`${USER_ROLE_LIST}`, null, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    UserRole: [],
    list: [],
};

const UserSlice = createSlice({
    name: "TaskMaster",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(handleUserRole.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleUserRole.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.UserRole = action.payload;
            state.message = action.payload.message;
            toast.success(action.payload.message);

        });
        builder.addCase(handleUserRole.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(getUserRoleList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserRoleList.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.list = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getUserRoleList.rejected, (state, action) => {
            state.loading = false;
            state.list = null;
            state.message = "Failed to data";
        });

    }
})

export const { resetStatus } = UserSlice.actions;
export default UserSlice.reducer;