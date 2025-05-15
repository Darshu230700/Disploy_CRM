import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTIVE_DEACTIVE_PHASE, DELETE_TEMPLATE, DELETE_TEMPLATE_PHASE, DUPLICATE_TEMPLATE, GET_TEMPLATES, GET_TEMPLATESBYID, INSERT_TEMPLATES, MOVE_TEMPLATE_PHASE } from "../Components/Common/API";
import toast from "react-hot-toast";

export const InsertTemplates = createAsyncThunk("ProjectTemplate/InsertTemplates", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_TEMPLATES, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getAlltemplates = createAsyncThunk("ProjectTemplate/getAlltemplates", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_TEMPLATES}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const deleteTemplate = createAsyncThunk("ProjectTemplate/deleteTemplate", async (ID,) => {
    try {
        const queryParams = new URLSearchParams({ ProjectTemplateID: ID, }).toString();
        const response = await axios.get(`${DELETE_TEMPLATE}?${queryParams}`);
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});
export const duplicateTemplate = createAsyncThunk("ProjectTemplate/duplicateTemplate", async (ID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams({ ProjectTemplateID: ID, }).toString();
        const response = await axios.post(`${DUPLICATE_TEMPLATE}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

export const getTemplatesByID = createAsyncThunk("ProjectTemplate/getTemplatesByID", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ ProjectTemplateID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GET_TEMPLATESBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        // toast.error('Failed to fetch data');
        throw error;
    }
});

export const MoveTemplatePhase = createAsyncThunk("ProjectTemplate/MoveTemplatePhase", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(MOVE_TEMPLATE_PHASE, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteTemplatePhase = createAsyncThunk("ProjectTemplate/deleteTemplatePhase", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${DELETE_TEMPLATE_PHASE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
});

export const getMarkAsPhase = createAsyncThunk("ProjectTemplate/getMarkAsPhase", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${ACTIVE_DEACTIVE_PHASE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    getAllTemplates: [],
    getTemplates: [],
};


const TemplateSlice = createSlice({
    name: "ProjectTemplate",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(InsertTemplates.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(InsertTemplates.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload.message;
            toast.success(action.payload.message);

        });
        builder.addCase(InsertTemplates.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(getAlltemplates.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAlltemplates.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllTemplates = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getAlltemplates.rejected, (state, action) => {
            state.loading = false;
            state.getAllTemplates = null;
            state.message = "Failed to data";
        });

        builder.addCase(deleteTemplate.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(deleteTemplate.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
        });

        builder.addCase(duplicateTemplate.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(duplicateTemplate.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(duplicateTemplate.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(getTemplatesByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getTemplatesByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getTemplates = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getTemplatesByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getTemplates = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(deleteTemplatePhase.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteTemplatePhase.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(deleteTemplatePhase.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
        });

        builder.addCase(MoveTemplatePhase.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(MoveTemplatePhase.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(MoveTemplatePhase.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(getMarkAsPhase.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMarkAsPhase.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(getMarkAsPhase.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })
    }
})

export const { resetStatus } = TemplateSlice.actions;
export default TemplateSlice.reducer