import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ADD_EDIT_PERSON, DELETE_PERSON, GET_All_PERSON, GET_PERSONBYID } from "../Components/Common/API";

// insert Person

export const handleAddPerson = createAsyncThunk("PersonMaster/handleAddPerson", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(ADD_EDIT_PERSON, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;

    }
});

// get Person

export const getAllPerson = createAsyncThunk("data/getAllPerson", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_All_PERSON}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

// Delete Person
export const handlePersonDelete = createAsyncThunk("PersonMaster/PersonDelete", async (id,) => {
    try {
        const queryParams = new URLSearchParams({ PersonMasterID: id, }).toString();
        const response = await axios.get(`${DELETE_PERSON}?${queryParams}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
});


export const getPersonByID = createAsyncThunk("data/getPersonByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ PersonID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token;

        const response = await axios.get(`${GET_PERSONBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error = ('Failed to fetch data ');
        throw error;
    }
}
);

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    getAllPerson: [],
    getPersonByID: [],
};


const PersonSlice = createSlice({
    name: "ProductMaster",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleAddPerson.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleAddPerson.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(handleAddPerson.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error = (action.payload.message);
        });

        builder.addCase(getAllPerson.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllPerson.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllPerson = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        
        builder.addCase(getAllPerson.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload ;
            state.token = null;
        });

        builder.addCase(handlePersonDelete.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handlePersonDelete.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            // toast.success(action.payload.message);


        });
        builder.addCase(handlePersonDelete.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            toast.error('Failed to delete user');

        });

        builder.addCase(getPersonByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPersonByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getPersonByID = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getPersonByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getPersonByID = null;
            state.error = payload ?? null;
            state.token = null;
        });

    },
});

export const { resetStatus } = PersonSlice.actions;

export default PersonSlice.reducer;