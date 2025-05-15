import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ADD_USER_REGISTER, DELETE_USERS, GET_USERS, getUrl } from "../Components/Common/API";
import { isValidToken } from "../Components/Common/Util";

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleRegisterUser = createAsyncThunk("auth/handleRegisterUser", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(ADD_USER_REGISTER, payload, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// export const handleRegisterUser = createAsyncThunk(
//   "auth/handleRegisterUser",
//   async ({ config }, { rejectWithValue }) => {
//     try {
//       const response = await axios.request(config);
//       return response.data;
//     } catch (error) {
//       if (error?.response) {
//         toast.error(error?.response?.data?.message);
//         return rejectWithValue(error?.response?.data);
//       }
//     }
//   }
// );

export const handleGetUserDetails = createAsyncThunk(
  "auth/handleGetUserDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await getUrl(`UserMaster/GetLoginUser?UserID=${id}`, {
        headers: { Authorization: token },
      });

      if (Object.values(response?.data?.data).length > 0) {
        return response.data?.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);


export const deleteUsers = createAsyncThunk("auth/deleteUsers", async (id, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ UserMasterIDs: id, }).toString();
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(`${DELETE_USERS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
});

export const getUsers = createAsyncThunk("auth/getUsers", async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.get(GET_USERS, null, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error('Failed to fetch data');
    throw error

  }
});

export const getUserByID = createAsyncThunk("auth/getUserByID", async (id, thunkAPI) => {
  try {
    const queryParams = new URLSearchParams({ UserID: id, }).toString();
    console.log('queryParams :>> ', queryParams);
    const token = thunkAPI.getState().root.auth.token;
    console.log('token :>> ', token);
    const response = await axios.getUrl(`UserMaster/GetLoginUser?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
    return response.data
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to fetch data');
    throw error;
  }
});

const initialState = {
  loading: false,
  user: null,
  error: null,
  token: null,
  userDetails: null,
  Users: []
};


const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, { payload }) => {
      state.loading = true;
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      window.location.href = window.location.origin;
      window.localStorage.removeItem("timer");
      localStorage.setItem("role_access", "");
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(handleLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleLoginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(handleLoginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });
    // register user
    builder.addCase(handleRegisterUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleRegisterUser.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.user = payload;
      state.error = null;
      // state.token = null;
      // toast.success(payload.message);
    });

    builder.addCase(handleRegisterUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // get user details
    builder.addCase(handleGetUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
      state.error = null;
    });
    builder.addCase(handleGetUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.userDetails = null;
      state.error = payload ?? null;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.Users = payload.data;
      state.error = null;
      state.token = payload?.data?.token;
    });

    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.Users = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // delete User
    builder.addCase(deleteUsers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.message = action.payload?.message;
    });

    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message;
      state.message = "Failed to delete user";
    });

    // Edit User
    builder.addCase(getUserByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserByID.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.Users = payload.data;
      state.token = payload?.data?.token;
    });

    builder.addCase(getUserByID.rejected, (state, { payload }) => {
      state.loading = false;
      state.Users = null;
      state.error = payload ?? null;
      state.token = null;
    });

  },
});

export const { handleLogout } = Authslice.actions;

export default Authslice.reducer;