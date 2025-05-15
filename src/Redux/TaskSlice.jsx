import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { DELETE_TASKS, GET_LOGIN_USER, GET_SUBTASKS_MARK, GET_TASKS, GET_TASKSBYID, GET_TASKSMARK, INSERT_TASKS } from "../Components/Common/API";


export const getAllTasks = createAsyncThunk("TaskMaster/getAllTasks", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();

        const response = await axios.get(`${GET_TASKS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const handleAddTaks = createAsyncThunk("TaskMaster/handleAddTaks", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_TASKS, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getTaskByID = createAsyncThunk("TaskMaster/getTaskByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ TaskID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GET_TASKSBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const deleteTasks = createAsyncThunk("TaskMaster/deleteTasks", async (id) => {
    try {
        const queryParams = new URLSearchParams({ TaskID: id, }).toString();
        const response = await axios.get(`${DELETE_TASKS}?${queryParams}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getMarkAsTasks = createAsyncThunk("TaskMaster/getMarkAsTasks", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_TASKSMARK}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const getMarkAsSubTask = createAsyncThunk("TaskMaster/getMarkAsSubTask", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_SUBTASKS_MARK}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const getAllLoginUser = createAsyncThunk("TaskMaster/getAllLoginUser", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;

        const response = await axios.get(`${GET_LOGIN_USER}`, { headers: { Authorization: `Bearer ${token}` } });
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
    getAllTasks: [],
    getTask: [],
    User: [],
};

const Taskslice = createSlice({
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
        builder.addCase(getAllTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllTasks = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getAllTasks.rejected, (state, action) => {
            state.loading = false;
            state.getAllTasks = null;
            state.message = "Failed to data";
        });

        builder.addCase(handleAddTaks.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleAddTaks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload.message;
            toast.success(action.payload.message);

        });
        builder.addCase(handleAddTaks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });


        builder.addCase(getTaskByID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTaskByID.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "";
            state.getTask = action.payload.data;
            state.message = action.payload.message || "This operation successFully";
        });
        builder.addCase(getTaskByID.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
        });

        builder.addCase(deleteTasks.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message || "Deal deleted successfully";
        });
        builder.addCase(deleteTasks.rejected, (state, action) => {
            state.status = "failed";
            state.message = "Failed to delete Deal";
        });

        builder.addCase(getMarkAsTasks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMarkAsTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        });
        builder.addCase(getMarkAsTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        });


        builder.addCase(getMarkAsSubTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMarkAsSubTask.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        });
        builder.addCase(getMarkAsSubTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        });

        builder.addCase(getAllLoginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllLoginUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.User = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getAllLoginUser.rejected, (state, action) => {
            state.loading = false;
            state.User = null;
            state.message = "Failed to data";
        });

    }
})

export const { resetStatus } = Taskslice.actions;
export default Taskslice.reducer;