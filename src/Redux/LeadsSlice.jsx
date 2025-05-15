import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_OR_UPDATE_LEADMASTER, GET_ARCHIVE, GET_EDIT_LEADMASTER, GET_LEADMASTER, IMPORT_LEAD, LEADMASTER_REMOVE, SAVE_NOTES } from "../Components/Common/API";
import toast from "react-hot-toast";


const initialState = {
  loading: false,
  leadsData: [],
  getHistory: [],
  leadsEdit: '',
  error: null,
  message: null,
  token: null,
};

export const getLeadmaster = createAsyncThunk("LeadMaster/getLeadmaster", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.post(`${GET_LEADMASTER}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch data');
    console.log("error", error);
    throw error;
  }
});

export const addORUpdateLeadMaster = createAsyncThunk("LeadMaster/addORUpdateLeadMaster", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(ADD_OR_UPDATE_LEADMASTER, payload, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.status) {
      return {
        status: true,
        message: response.data.message,
      };
    } else {
      return { status: false, message: "Failed to save data" };
    }
  } catch (error) {
    throw error;
  }
});

export const editLeadmaster = createAsyncThunk("LeadMaster/editLeadmaster", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ LeadID: payload }).toString();
    const response = await axios.get(`${GET_EDIT_LEADMASTER}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

export const removeLeadmaster = createAsyncThunk("LeadMaster/removeLeadmaster", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ LeadID: payload }).toString();
    const response = await axios.get(`${LEADMASTER_REMOVE}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
);

export const saveNotes = createAsyncThunk("LeadMaster/saveNotes", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(SAVE_NOTES, payload, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.status) {
      return response.data;
    } else {
      return { status: false, message: "Failed to save data" };
    }
  } catch (error) {
    throw error;
  }
});

export const archiveLeadData = createAsyncThunk("LeadMaster/archiveLeadData", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${GET_ARCHIVE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

export const handleImportFile = createAsyncThunk("LeadMaster/AddFileUpload", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(IMPORT_LEAD, formData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});



const LeadsSlice = createSlice({
  name: "leads",
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
    builder.addCase(addORUpdateLeadMaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addORUpdateLeadMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });
    builder.addCase(addORUpdateLeadMaster.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

    builder.addCase(getLeadmaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLeadmaster.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.leadsData = action.payload.data.data;
      state.message = action.payload.message || "This operation successFully";
      state.data = action.payload?.data;
    });
    builder.addCase(getLeadmaster.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message || "Failed to data";
    });

    builder.addCase(editLeadmaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editLeadmaster.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.leadsEdit = action.payload.data;
      state.message = action.payload.message || "This operation successFully";
    });
    builder.addCase(editLeadmaster.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
    });

    builder.addCase(removeLeadmaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeLeadmaster.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.message = action.payload.message || "This operation successFully";
    });
    builder.addCase(removeLeadmaster.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message || "Failed to data";
    });

    builder.addCase(saveNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      toast.success(action.payload.message);
    });
    builder.addCase(saveNotes.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });


    // For archiveLeadData action
    builder.addCase(archiveLeadData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(archiveLeadData.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      toast.success(action.payload.message);
    })
    builder.addCase(archiveLeadData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      toast.error(action.error.message);
    })

    builder.addCase(handleImportFile.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(handleImportFile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      toast.success(action.payload.message);
    });

    builder.addCase(handleImportFile.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      toast.error(action.payload.message);
    });

  },
});

export const { resetStatus } = LeadsSlice.actions;

export default LeadsSlice.reducer;

// jignesh