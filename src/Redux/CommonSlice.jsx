import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { DELETE_HISTORY, EDIT_ACTIVITY, GET_ALL_HISTORY, GET_ALL_LABEL, GET_ALL_VISIVLETO, GET_CATEGORY, GET_CITY, GET_COUNTRY, GET_CURRENCY, GET_FILES, GET_FOLDERS, GET_FOLDERS_PREVIEW, INSERT_CATEGORY, INSERT_DOCUMENT, INSERT_FILES_FOLDER, INSERT_LOSTREASON, SAVE_ACTIVITY, SAVE_LABEL } from "../Components/Common/API";


const initialState = {
  loading: false,
  getCurrency: [],
  getAllLabel: [],
  getAllVisibleTo: [],
  activityData: [],
  error: null,
  token: null,
  success: '',
  common: null,
  getFiles: [],
  getHistory: [],
  getFolders: [],
  getFolderPreview: [],
  getCategorys: [],
  Country: [],
  City: []
};

export const handleInsertLostReason = createAsyncThunk("common/handleInsertLostReason", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_LOSTREASON, payload, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getCurrency = createAsyncThunk("common/getCurrency", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(GET_CURRENCY);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const getAllLabel = createAsyncThunk("common/getAllLabel", async ({ config }, { rejectWithValue }) => {  //  GetAllLabel 
  try {
    const response = await axios.get(GET_ALL_LABEL);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);
export const getAllCategory = createAsyncThunk("common/getAllCategory", async ({ config }, { rejectWithValue }) => {  //  getAllCategory 
  try {
    const response = await axios.get(GET_CATEGORY);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
});

export const getAllVisibleTo = createAsyncThunk("common/GetAllVisibleTo", async ({ config }, { rejectWithValue }) => {  //  GetAllVisibleTo 
  try {
    const response = await axios.get(GET_ALL_VISIVLETO);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
});

export const getAllCountry = createAsyncThunk("common/getAllCountry", async ({ config }, { rejectWithValue }) => {  //  getAllCountry 
  try {
    const response = await axios.get(GET_COUNTRY);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
});

export const getCity = createAsyncThunk("common/getCity", async (id, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ CountryID: id, }).toString();
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(`${GET_CITY}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to fetch data');
    throw error;
  }
});

export const saveActivity = createAsyncThunk("data/save", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(SAVE_ACTIVITY, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;

  } catch (error) {
    throw error;
  }
});

export const saveLabel = createAsyncThunk("data/saveLabel", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(SAVE_LABEL, payload, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.status) {
      return response.data;
    } else {
      return { status: false, message: "Failed to save data" };
    }
  } catch (error) {
    throw error;
  }
});

export const insertCategory = createAsyncThunk("data/insertCategory", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_CATEGORY, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getByIdApiActivity = createAsyncThunk("data/getByIdApiActivity", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams({ ActivityID: payload }).toString();
    const response = await axios.get(`${EDIT_ACTIVITY}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
);
// Extra api ===========
export const DocumentUpload = createAsyncThunk("Common/DocumentUpload", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_DOCUMENT, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data', } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
);


export const getFiles = createAsyncThunk("Common/getFiles", async ({ identityID, identityName }) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('IdentityID', identityID);
    queryParams.append('IdentityName', identityName);
    const queryString = queryParams.toString();

    const response = await axios.get(`${GET_FILES}?${queryString}`);

    if (response.data.status) {
      return {
        status: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return { status: false, message: "Failed to fetch data" };
    }
  } catch (error) {
    throw error;
  }
}
);

//// ===========
export const InsertFilesFolder = createAsyncThunk("Common/InsertFilesFolder", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(INSERT_FILES_FOLDER, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data', } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getAllHistory = createAsyncThunk("data/getAllHistory", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${GET_ALL_HISTORY}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});


export const getAllFolders = createAsyncThunk("data/getAllFolders", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${GET_FOLDERS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch data');
    console.log("error", error);
    throw error;
  }
});

export const getFoldersPreview = createAsyncThunk("data/getFoldersPreview", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${GET_FOLDERS_PREVIEW}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

export const DeleteHistory = createAsyncThunk("data/DeleteHistory", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${DELETE_HISTORY}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
    return response.data

  } catch (error) {
    console.log("error", error);
    throw error;
  }
})

const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.status = null;
      state.success = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrency.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getCurrency = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getCurrency.rejected, (state, { payload }) => {
      state.loading = false;
      state.getCurrency = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllLabel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllLabel.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllLabel = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllLabel.rejected, (state, { payload }) => {
      state.loading = false;
      state.getAllLabel = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getCategorys = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.getCategorys = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllVisibleTo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllVisibleTo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllVisibleTo = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllVisibleTo.rejected, (state, { payload }) => {
      state.loading = false;
      state.getAllVisibleTo = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // country
    builder.addCase(getAllCountry.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCountry.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.Country = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllCountry.rejected, (state, { payload }) => {
      state.loading = false;
      state.Country = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // city
    builder.addCase(getCity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCity.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.City = payload?.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getCity.rejected, (state, { payload }) => {
      state.loading = false;
      state.City = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(saveActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveActivity.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      toast.success(payload.message);
    });
    builder.addCase(saveActivity.rejected, (state, { payload }) => {
      state.loading = false;
      toast.error = (payload.message);
      state.token = null;
    });

    builder.addCase(saveLabel.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.status = ''
    });
    builder.addCase(saveLabel.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.status = 'successLabel'
      state.message = payload?.message
    });
    builder.addCase(saveLabel.rejected, (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.status = ''
    })

    builder.addCase(insertCategory.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.status = ''
    });
    builder.addCase(insertCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      toast.success(payload?.message)
    });
    builder.addCase(insertCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.status = ''
    })

      // For getByIdApiActivity action
      .addCase(getByIdApiActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByIdApiActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activityData = action.payload?.data;
        state.success = action.payload.message;
        // toast.success(action.payload.message);
      })
      .addCase(getByIdApiActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })


      .addCase(DocumentUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(DocumentUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.common = action.payload.data;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(DocumentUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      .addCase(InsertFilesFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(InsertFilesFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.common = action.payload.data;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(InsertFilesFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

    builder.addCase(getFiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getFiles = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getFiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.getFiles = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.getHistory = action.payload?.data;
      state.message = action.payload.message || "This operation successFully";
    });
    builder.addCase(getAllHistory.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message || "Failed to data";
    });

    builder.addCase(getAllFolders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFolders.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.getFolders = action.payload?.data;
      state.message = action.payload.message || "This operation successFully";
    });
    builder.addCase(getAllFolders.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message || "Failed to data";
    });

    builder.addCase(getFoldersPreview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFoldersPreview.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "";
      state.getFolderPreview = action.payload?.data;
      state.message = action.payload.message || "This operation successFully";
    });
    builder.addCase(getFoldersPreview.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message || "Failed to data";
    });

    builder.addCase(DeleteHistory.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(DeleteHistory.fulfilled, (state, action) => {
      state.status = "succeded"
      state.data = action.payload
      state.message = action.payload?.message || "file deleted successfully";

    })
    builder.addCase(DeleteHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete image";
    });

    builder.addCase(handleInsertLostReason.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(handleInsertLostReason.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      toast.success(action.payload.message);

    });
    builder.addCase(handleInsertLostReason.rejected, (state, action) => {
      state.status = "failed";
      toast.error = (action.payload.message);
    });

  },
});

export const { resetStatus } = CommonSlice.actions;

export default CommonSlice.reducer;

// jignesh