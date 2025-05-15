import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_PROJECT, GET_PROJECT, GET_PROJECT_ARCHIVE, GET_PROJECTBYID, INSERT_PROJECT, UPDATE_CANCELD } from "../Components/Common/API";
import axios from "axios";
import toast from "react-hot-toast";


export const getProject = createAsyncThunk("ProjectMaster/getProject", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_PROJECT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});
export const getArchiveProject = createAsyncThunk("ProjectMaster/getArchiveProject", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_PROJECT_ARCHIVE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const InsertProject = createAsyncThunk("ProjectMaster/InsertProject", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_PROJECT, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});


export const deleteProject = createAsyncThunk("ProjectMaster/deleteProject", async (id, { rejectWithValue }) => {
    try {
        const queryParams = new URLSearchParams({ ProjectID: id, }).toString();
        const response = await axios.get(`${DELETE_PROJECT}?${queryParams}`);
        if (response.data.status) {
            return {
                status: true,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        console.log('error', error)
        throw error;

    }
}
);

export const geProjectByID = createAsyncThunk("ProjectMaster/geProjectByID", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ ProjectID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_PROJECTBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
})

export const handleupdateCancel = createAsyncThunk("ProjectMaster/handleupdateCancel", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${UPDATE_CANCELD}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});;

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    getProject: [],
    getProjectbyID: [],

}


const ProjectSlice = createSlice({
    name: "ProjectMaster",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getProject.pending, (state) => {
            state.status = "loading";
        })

        builder.addCase(getProject.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getProject = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getProject.rejected, (state, { payload }) => {
            state.loading = false;
            state.getProject = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(InsertProject.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(InsertProject.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
            state.message = action.payload.message;
        });

        builder.addCase(InsertProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
            state.message =
                action.payload.message || "Somthing went wrong";
        });

        builder.addCase(deleteProject.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message || "project deleted successfully";
        });

        builder.addCase(deleteProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete project";
        });

        builder.addCase(geProjectByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(geProjectByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getProjectbyID = payload.data;
            state.token = payload?.data?.token;
        });

        builder.addCase(geProjectByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getProjectbyID = null;
            state.error = payload ?? null;
            state.token = null;
        });

        // For archiveLeadData action
        builder.addCase(getArchiveProject.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getArchiveProject.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(getArchiveProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })

        builder.addCase(handleupdateCancel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleupdateCancel.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(handleupdateCancel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })
    }
})

export const { resetStatus } = ProjectSlice.actions;
export default ProjectSlice.reducer