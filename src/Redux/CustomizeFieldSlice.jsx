import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_FIELD_GROUP, DELETE_FIELDS, GET_FIELD_GROUP, GET_FIELDS, GETBYID_FIELD_GROUP, GETBYID_FIELDS, INSERT_FIELD_GROUP, INSERT_FIELDS } from "../Components/Common/API";
import axios from "axios";
import toast from "react-hot-toast";


export const getAllgroup = createAsyncThunk("CustomizeFieldMaster/getAllgroup", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;

        const response = await axios.get(`${GET_FIELD_GROUP}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const InsertGroupFiled = createAsyncThunk("CustomizeFieldMaster/InsertGroupFiled", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_FIELD_GROUP, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getGroupFiledByID = createAsyncThunk("CustomizeFieldMaster/getGroupFiledByID", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ GroupID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETBYID_FIELD_GROUP}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const handledeleteGroupFiled = createAsyncThunk("CustomizeFieldMaster/handledeleteGroupFiled", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams({ GroupID: id, }).toString();
        const response = await axios.get(`${DELETE_FIELD_GROUP}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw error;
    }
});

export const getAllFiled = createAsyncThunk("CustomizeFieldMaster/getAllFiled", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_FIELDS}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const InsertFiled = createAsyncThunk("CustomizeFieldMaster/InsertFiled", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_FIELDS, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const handledeleteFiled = createAsyncThunk("CustomizeFieldMaster/handledeleteFiled", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams({ CustomizeFieldID: id, }).toString();
        const response = await axios.get(`${DELETE_FIELDS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw error;
    }
});

export const getFiledByID = createAsyncThunk("CustomizeFieldMaster/getFiledByID", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ CustomizeFieldID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETBYID_FIELDS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    getAllgroup: [],
    getgroupField: [],
    getAllfiled: [],
    getfiled: [],
}


const FieldSlice = createSlice({
    name: "CustomizeFieldMaster",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getAllgroup.pending, (state) => {
            state.status = "loading";
        })

        builder.addCase(getAllgroup.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllgroup = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getAllgroup.rejected, (state, { payload }) => {
            state.loading = false;
            state.getAllgroup = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(getGroupFiledByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getGroupFiledByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getgroupField = payload.data;
            state.token = payload?.data?.token;
        });

        builder.addCase(getGroupFiledByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getgroupField = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(InsertGroupFiled.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(InsertGroupFiled.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
            state.message = action.payload.message;
        });

        builder.addCase(InsertGroupFiled.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
            state.message = action.payload.message || "Somthing went wrong";
        });

        builder.addCase(handledeleteGroupFiled.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(handledeleteGroupFiled.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message
        });

        builder.addCase(handledeleteGroupFiled.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete ";
        });

        builder.addCase(getAllFiled.pending, (state) => {
            state.status = "loading";
        })

        builder.addCase(getAllFiled.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllfiled = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getAllFiled.rejected, (state, { payload }) => {
            state.loading = false;
            state.getAllfiled = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(InsertFiled.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(InsertFiled.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
            state.message = action.payload.message;
        });

        builder.addCase(InsertFiled.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
            state.message = action.payload.message || "Somthing went wrong";
        });

        builder.addCase(handledeleteFiled.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(handledeleteFiled.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message
        });

        builder.addCase(handledeleteFiled.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete ";
        });

        builder.addCase(getFiledByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getFiledByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getfiled = payload.data;
            state.token = payload?.data?.token;
        });

        builder.addCase(getFiledByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getfiled = null;
            state.error = payload ?? null;
            state.token = null;
        });


    }
})

export const { resetStatus } = FieldSlice.actions;
export default FieldSlice.reducer