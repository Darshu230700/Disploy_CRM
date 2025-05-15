import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_FOLDER, DELETE_RELATED_ORGANIZATION, DELETED_ORGANIZATION, EDIT_ORGANIZATION, GET_ORGANIZATION, INSERT_RELATED_ORGANIZATION, LINK_THISORGANIZATION, MOVE_TO_FOLDER, SAVE_UPDATE_ORGANIZATION } from "../Components/Common/API";
import toast from "react-hot-toast";


// Action creator for making async API call
export const fetchApiData = createAsyncThunk("OrganizationsMaster/getOrgData", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(GET_ORGANIZATION, { headers: { Authorization: `Bearer ${token}` }, });

    return response.data;
  } catch (error) {
    toast.error("Failed to fetch data");
    throw error;
  }
});

export const saveApiData = createAsyncThunk("OrganizationsMaster/saveApiData", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(SAVE_UPDATE_ORGANIZATION, payload, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getByIdApi = createAsyncThunk("data/getByIdApi", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ OrganizationID: payload }).toString();
    const response = await axios.get(`${EDIT_ORGANIZATION}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
);

export const removeByIdApi = createAsyncThunk("data/removeByIdApi", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ OrganizationID: payload }).toString();
    const response = await axios.get(`${DELETED_ORGANIZATION}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const linkthisorganization = createAsyncThunk("data/linkthisorganization", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.post(`${LINK_THISORGANIZATION}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const createFolderAction = createAsyncThunk("data/createFolderAction", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(`${CREATE_FOLDER}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const moveToFolderAction = createAsyncThunk("data/moveToFolderAction", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(`${MOVE_TO_FOLDER}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const handleRelatedOrg = createAsyncThunk("OrganizationsMaster/handleRelatedOrg", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_RELATED_ORGANIZATION, payload, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const removeRealatedOrg = createAsyncThunk("OrganizationsMaster/removeRealatedOrg", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ RelatedOrganizationID: id }).toString();
    const response = await axios.get(`${DELETE_RELATED_ORGANIZATION}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  organizationData: [],
  getHistoryOrganization: [],
  folders: [],
  organization: null,
  error: null,
  message: null,
  success: '',
};

const OrganizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationData = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Failed to fetch data");
      })

      // For saveApiData action
      .addCase(saveApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(saveApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // For getByIdApi action
      .addCase(getByIdApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload.data;
        // toast.success(action.payload.message);
      })
      .addCase(getByIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // For removeByIdApi action
      .addCase(removeByIdApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeByIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = action.payload.message;
        // toast.success(action.payload.message);
      })
      .addCase(removeByIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // For linkthisorganization action
      .addCase(linkthisorganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(linkthisorganization.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(linkthisorganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // For createFolderAction action
      .addCase(createFolderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFolderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(createFolderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // For moveToFolderAction action
      .addCase(moveToFolderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(moveToFolderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

      })
      .addCase(moveToFolderAction.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.payload.message);
      })
      // RelatedOrganization
      .addCase(handleRelatedOrg.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleRelatedOrg.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(handleRelatedOrg.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })

      // RelatedOrganization remove
      .addCase(removeRealatedOrg.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeRealatedOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(removeRealatedOrg.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
      })

  },
});

export const { resetStatus } = OrganizationSlice.actions;

export default OrganizationSlice.reducer;
