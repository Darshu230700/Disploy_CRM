import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ALL_GMAIL_DETAILS, ALL_GMAIL_DETAILS_BY_ID, CHECK_CRED_EXIST, CREATE_GMAIL_CRED, GET_ALL_CATEGORY, SEND_MAIL } from "../Components/Common/API";
import toast from "react-hot-toast";

const initialState = {
    emailCred: [],
    status: "idle",
    error: null,
    success: null,
    message: null,
    checkCred: [],
    Inbox: [],
    MailById: [],
    SendMail: null,
    category: []
};

export const AddGmailCred = createAsyncThunk("Email/AddGmailCred", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(CREATE_GMAIL_CRED, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const handleSendMails = createAsyncThunk("Email/handleSendMails", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(SEND_MAIL, payload, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const GetAllCategory = createAsyncThunk("Email/GetAllCategory", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(GET_ALL_CATEGORY, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error('Failed to fetch data');
        throw error
    }
});
export const handleCheckCred = createAsyncThunk("Email/handleCheckCred", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(CHECK_CRED_EXIST, null, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error('Failed to fetch data');
        throw error
    }
});

export const getAllGmailDetails = createAsyncThunk("Email/getAllGmailDetails", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams(payload).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${ALL_GMAIL_DETAILS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log('error', error)
        toast.error('Failed to fetch data');
        throw error;
    }
});
export const getGmailDetailsbyID = createAsyncThunk("Email/getGmailDetailsbyID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams(payload).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${ALL_GMAIL_DETAILS_BY_ID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data
    } catch (error) {
        console.log('error', error)
        toast.error('Failed to fetch data');
        throw error;
    }
});


const EmailSlice = createSlice({
    name: "Email",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.emailCred = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(GetAllCategory.pending, (state) => {
                state.status = null;
                state.loading = true;
            })
            .addCase(GetAllCategory.fulfilled, (state, action) => {
                state.status = null;
                state.category = action.payload?.data;
            })
            .addCase(GetAllCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(handleCheckCred.pending, (state) => {
                state.status = null;
                state.loading = true;
            })
            .addCase(handleCheckCred.fulfilled, (state, action) => {
                state.status = null;
                state.checkCred = action.payload?.data;
            })
            .addCase(handleCheckCred.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(getAllGmailDetails.pending, (state) => {
                state.status = null;
            })
            .addCase(getAllGmailDetails.fulfilled, (state, action) => {
                state.status = null;
                state.Inbox = action.payload?.data;
            })
            .addCase(getAllGmailDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
        builder
            .addCase(getGmailDetailsbyID.pending, (state) => {
                state.status = null;
            })
            .addCase(getGmailDetailsbyID.fulfilled, (state, action) => {
                state.status = null;
                state.MailById = action.payload?.data;
            })
            .addCase(getGmailDetailsbyID.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder.addCase(AddGmailCred.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(AddGmailCred.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
        });

        builder.addCase(AddGmailCred.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            toast.error(action.payload.message);
        });
        builder.addCase(handleSendMails.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(handleSendMails.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
        });

        builder.addCase(handleSendMails.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            toast.error(action.payload.message);
        });


    }
});

export const { resetStatus } = EmailSlice.actions

export default EmailSlice.reducer