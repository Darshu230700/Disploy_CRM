import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { GET_DEALBYID, DELETE_DEAL, GET_DEAL, INSERT_DEAL, INSERT_SUBSCRIPTION, GETBYID_SUBSCRIPTION, DELETE_SUBSCRIPTION, CANCEL_SUBSCRIPTION, INSERT_PAYMENT, GETBYID_PAYMENT, DELETE_PAYMENT, INSERT_DEAL_PRODUCT, GETBYID_DEAL_PRODUCT, UPDATE_WONLOST, DUPLICATE_DEAL, IMPORT_DEAL } from "../Components/Common/API"; // Assuming DELETE_DEAL is the API endpoint for deleting a deal


export const handleAddDeal = createAsyncThunk("DealMaster/handleAddDeal", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_DEAL, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const AddDealSubscription = createAsyncThunk("DealMaster/AddDealSubscription", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_SUBSCRIPTION, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const AddDealPaymentPlan = createAsyncThunk("DealMaster/AddDealPaymentPlan", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_PAYMENT, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const handleInsertDealProduct = createAsyncThunk("DealMaster/handleInsertDealProduct", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_DEAL_PRODUCT, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const handleupdateWonLost = createAsyncThunk("DealMaster/handleupdateWonLost", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${UPDATE_WONLOST}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});


export const getAllDeals = createAsyncThunk("DealMaster/getAllDeals", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_DEAL}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});


export const getDealByID = createAsyncThunk("DealMaster/getDealByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GET_DEALBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getDealsubScription = createAsyncThunk("DealMaster/getDealsubScription", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealsubscriptionID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GETBYID_SUBSCRIPTION}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getDealPayment = createAsyncThunk("DealMaster/getDealPayment", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealsubscriptionID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GETBYID_PAYMENT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getDealProductById = createAsyncThunk("DealMaster/getDealProductById", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealProductID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${GETBYID_DEAL_PRODUCT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const deleteDeal = createAsyncThunk("DealMaster/deleteDeal", async (dealId, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealID: dealId, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${DELETE_DEAL}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

export const handleDuplicateDeal = createAsyncThunk("DealMaster/handleDuplicateDeal", async (dealId, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealID: dealId, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.post(`${DUPLICATE_DEAL}?${queryParams}`, null, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});



export const deleteSubscription = createAsyncThunk("DealMaster/deleteSubscription", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealsubscriptionID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${DELETE_SUBSCRIPTION}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

export const deletePayment = createAsyncThunk("DealMaster/deletePayment", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ DealPaymentScheduleID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${DELETE_PAYMENT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

export const CancelSubscription = createAsyncThunk("DealMaster/CancelSubscription", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams(payload).toString();
        const token = thunkAPI.getState().root.auth.token
        const response = await axios.get(`${CANCEL_SUBSCRIPTION}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        if (response.data.status) {
            return { status: true, message: response.data.message, data: response.data.data, };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

export const ImportDealFile = createAsyncThunk("DealMaster/ImportDealFile", async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(IMPORT_DEAL, formData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: "",
    message: "",
    getDeals: [],
    getDealID: [],
    getsubScriptionByid: [],
    getPayment: [],
    getDealProduct: [],
};

const DealSlice = createSlice({
    name: "DealMaster",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(handleAddDeal.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleAddDeal.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(handleAddDeal.rejected, (state, action) => {
            state.status = "failed";
            toast.error = (action.payload.message);

        });

        builder.addCase(AddDealSubscription.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(AddDealSubscription.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            // toast.success(action.payload.message);

        });
        builder.addCase(AddDealSubscription.rejected, (state, action) => {
            state.status = "failed";
            toast.error = (action.payload.message);
        });

        builder.addCase(AddDealPaymentPlan.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(AddDealPaymentPlan.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(AddDealPaymentPlan.rejected, (state, action) => {
            state.status = "failed";
            toast.error = (action.payload.message);
        });

        builder.addCase(handleInsertDealProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleInsertDealProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(handleInsertDealProduct.rejected, (state, action) => {
            state.status = "failed";
            toast.error = (action.payload.message);
        });

        builder.addCase(getAllDeals.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getAllDeals.fulfilled, (state, action) => {
            state.loading = false;
            state.getDeals = action.payload.data;
            state.token = action?.data?.token;
            state.data = action.payload?.data;
        });

        builder.addCase(getAllDeals.rejected, (state, action) => {
            state.loading = false;
            state.getDeals = null;
            state.message = action.error.message || "Failed to data";
        });

        builder.addCase(getDealByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getDealByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getDealID = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getDealByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getDealID = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(getDealsubScription.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getDealsubScription.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getsubScriptionByid = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getDealsubScription.rejected, (state, { payload }) => {
            state.loading = false;
            state.getsubScriptionByid = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(getDealPayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getDealPayment.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getPayment = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getDealPayment.rejected, (state, { payload }) => {
            state.loading = false;
            state.getPayment = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(getDealProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getDealProductById.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getDealProduct = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getDealProductById.rejected, (state, { payload }) => {
            state.loading = false;
            state.getDealProduct = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(deleteDeal.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteDeal.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message || "Deal deleted successfully";
        });
        builder.addCase(deleteDeal.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete Deal";
        });

        builder.addCase(handleDuplicateDeal.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleDuplicateDeal.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);

        });
        builder.addCase(handleDuplicateDeal.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(deleteSubscription.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteSubscription.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message
        });
        builder.addCase(deleteSubscription.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete Deal";
        });

        builder.addCase(deletePayment.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deletePayment.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message
        });
        builder.addCase(deletePayment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete Deal";
        });

        builder.addCase(CancelSubscription.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(CancelSubscription.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message
        });
        builder.addCase(CancelSubscription.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload?.message;
            state.token = null;
            state.message = "Failed to delete Deal";
        });

        builder.addCase(handleupdateWonLost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleupdateWonLost.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(handleupdateWonLost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })

        builder.addCase(ImportDealFile.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(ImportDealFile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "succeeded";
            toast.success(action.payload.message);
        });

        builder.addCase(ImportDealFile.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            toast.error(action.payload.message);
        });
    },
});

export const { resetStatus } = DealSlice.actions;

export default DealSlice.reducer;
