import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { GET_All_WEB_FORMS, GET_FIELD_TYPE_MASTER, GET_STYLE_CATEGORY_MASTER, GET_WEBFORM_TYPE, GET_WEB_FORM_BY_ID } from "../Components/Common/API";



export const getWebFromType = createAsyncThunk("common/GetWebFromType", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(GET_WEBFORM_TYPE);
    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const getFieldTypeMaster = createAsyncThunk("common/GetFieldTypeMaster", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(GET_FIELD_TYPE_MASTER);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const getStyleCategoryMaster = createAsyncThunk("common/GetStyleCategoryMaster", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(GET_STYLE_CATEGORY_MASTER);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const getAllWebForms = createAsyncThunk("WebFrom/GetAllWebForms", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(GET_All_WEB_FORMS);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const getWebFormsByID = createAsyncThunk("WebFrom/GetWebFormsByID", async ({ config }, { rejectWithValue }) => {  // get Currency 
  try {
    const response = await axios.get(`${GET_WEB_FORM_BY_ID}?WebFromMasterID=${config?.selectForm}`);
    return response.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
}
);

export const handleAddEditWebForm = createAsyncThunk(
  "WebFrom/handleAddEditWebForm",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getAllGridWebForms = createAsyncThunk(
  "WebFrom/getAllGridWebForms",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getUserWebFormsByID = createAsyncThunk(
  "WebFrom/getUserWebFormsByID",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getDeleteWebForm = createAsyncThunk(
  "WebFrom/getDeleteWebForm",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getDuplicateWebForm = createAsyncThunk(
  "WebFrom/getDuplicateWebForm",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getActiveDeActiveWebForm = createAsyncThunk(
  "WebFrom/getActiveDeActiveWebForm",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const geEmbedWebForm = createAsyncThunk(
  "WebFrom/geEmbedWebForm",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getFormViewed = createAsyncThunk(
  "WebFrom/getFormViewed",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const SaveWebFormData = createAsyncThunk(
  "WebFrom/SaveWebFormData",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

const initialState = {
  loading: false,
  getAllWebFromType: [],
  getFieldTypeMaster: [],
  getStyleCategoryMaster: [],
  getAllWebForms: [],
  getAllGridWebForms: [],
  getUserWebFormsByID: {},
  getWebFormsByID: [],
  data: [],
  error: null,
  token: null,
  geEmbedWebForm: [],
  getFormViewed: []
};

const WebFormSlice = createSlice({
  name: "WebForm",
  initialState,
  reducers: {
    handleLogout: (state, { payload }) => {
      state.loading = true;
      state.getFieldTypeMaster = [];
      state.token = null;
      state.error = null;
      state.loading = false;
      window.location.href = window.location.origin;
      window.localStorage.removeItem("timer");
      localStorage.setItem("role_access", "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWebFromType.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWebFromType.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllWebFromType = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getWebFromType.rejected, (state, { payload }) => {
      state.loading = false;
      state.getAllWebFromType = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getFieldTypeMaster.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFieldTypeMaster.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getFieldTypeMaster = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getFieldTypeMaster.rejected, (state, { payload }) => {
      state.loading = false;
      state.getFieldTypeMaster = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getStyleCategoryMaster.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getStyleCategoryMaster.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getStyleCategoryMaster = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getStyleCategoryMaster.rejected, (state, { payload }) => {
      state.loading = false;
      state.getStyleCategoryMaster = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllWebForms.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllWebForms.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllWebForms = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllWebForms.rejected, (state, { payload }) => {
      state.loading = false;
      state.getAllWebForms = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getAllGridWebForms.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllGridWebForms.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllGridWebForms = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getAllGridWebForms.rejected, (state, { payload }) => {
      state.loading = false;
      state.getAllGridWebForms = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getUserWebFormsByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserWebFormsByID.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getUserWebFormsByID = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getUserWebFormsByID.rejected, (state, { payload }) => {
      state.loading = false;
      state.getUserWebFormsByID = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(getWebFormsByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWebFormsByID.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getWebFormsByID = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(getWebFormsByID.rejected, (state, { payload }) => {
      state.loading = false;
      state.getWebFormsByID = null;
      state.error = payload ?? null;
      state.token = null;
    });

    builder.addCase(handleAddEditWebForm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(handleAddEditWebForm.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(handleAddEditWebForm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(getDeleteWebForm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDeleteWebForm.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(getDeleteWebForm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(getDuplicateWebForm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDuplicateWebForm.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(getDuplicateWebForm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(getActiveDeActiveWebForm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getActiveDeActiveWebForm.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(getActiveDeActiveWebForm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(geEmbedWebForm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(geEmbedWebForm.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.geEmbedWebForm = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(geEmbedWebForm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(getFormViewed.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getFormViewed.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.getFormViewed = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(getFormViewed.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });

    builder.addCase(SaveWebFormData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(SaveWebFormData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.getFormViewed = action.payload;
      state.message = action.payload.message || "Product Add successfully";
    });
    builder.addCase(SaveWebFormData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.message =
        action.payload.message || "This Product is not insert try agin";
    });
  },
});

export const { handleLogout } = WebFormSlice.actions;

export default WebFormSlice.reducer;