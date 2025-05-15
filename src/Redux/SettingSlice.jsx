import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ACTIVE_DEACTIVE_RULES, ADDOREDIT_RULE, DELETE_AUTOMATED_WEBHOOK, DELETE_RULES, DELETE_WEBHOOKS, GET_AUTOMATED_WEBHOOK, GET_RULES, GET_RULES_FILEDS, GET_WEBHOOKS, GETBYID_RULE, INSERT_AUTOMATED_WEBHOOK, INSERT_WEBHOOKS } from "../Components/Common/API";

// Rules
export const getAllRules = createAsyncThunk("RulesMaster/getAllRules", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_RULES}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log('error :>> ', error);
        toast.error('Failed to fetch data')
        throw error;
    }
})

export const getAllRulesFilds = createAsyncThunk("RulesMaster/getAllRulesFilds", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_RULES_FILEDS}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log('error :>> ', error);
        toast.error('Failed to fetch data')
        throw error;
    }
})

export const getRuleByID = createAsyncThunk("RulesMaster/getRuleByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ RuleID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETBYID_RULE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error = ('Failed to fetch data ');
        throw error;
    }
});

export const handlerDeleteRules = createAsyncThunk("RulesMaster/handlerDeleteRules", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ RuleID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${DELETE_RULES}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const ActiveDeactiveRules = createAsyncThunk("RulesMaster/ActiveDeactiveRules", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams(payload).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${ACTIVE_DEACTIVE_RULES}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const InsertRules = createAsyncThunk("RulesMaster/InsertRules", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(ADDOREDIT_RULE, payload, { headers: { Authorization: `Bearer ${token}` }, })
        return response.data
    } catch (error) {
        console.log('error :>> ', error);
        throw error;
    }
})
// webhooks
export const getAllwebhooks = createAsyncThunk("WebhooksMaster/getAllwebhooks", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_WEBHOOKS}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log('error :>> ', error);
        toast.error('Failed to fetch data')
        throw error;
    }
})

export const InsertWebHook = createAsyncThunk("WebhooksMaster/InsertWebHook", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_WEBHOOKS, payload, { headers: { Authorization: `Bearer ${token}` }, })
        return response.data
    } catch (error) {
        console.log('error :>> ', error);
        throw error;
    }
})

export const deleteWebhook = createAsyncThunk("WebhooksMaster/deleteWebhook", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ WebhooksID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${DELETE_WEBHOOKS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
});
//Automated webhooks
export const getAutowebhook = createAsyncThunk("WebhooksMaster/getAutowebhook", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_AUTOMATED_WEBHOOK}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log('error :>> ', error);
        toast.error('Failed to fetch data')
        throw error;
    }
})

export const InsertAutoWebHook = createAsyncThunk("WebhooksMaster/InsertAutoWebHook", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_AUTOMATED_WEBHOOK, payload, { headers: { Authorization: `Bearer ${token}` }, })
        return response.data
    } catch (error) {
        console.log('error :>> ', error);
        throw error;
    }
})

export const deleteAutoWebhook = createAsyncThunk("WebhooksMaster/deleteAutoWebhook", async (id, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ AutomatedWebhookID: id, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${DELETE_AUTOMATED_WEBHOOK}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
});

const initialState = {
    loading: false,
    error: null,
    token: null,
    status: '',
    message: '',
    getallRules: [],
    getRule: [],
    getRuleFilds: [],
    getAllwebHooks: [],
    AutowebHook: []
}

const SettingsSlice = createSlice({
    name: "Rules",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRules.fulfilled, (state, action) => {
                state.loading = false;
                state.getallRules = action.payload.data;
            })
            .addCase(getAllRules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            .addCase(getAllRulesFilds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRulesFilds.fulfilled, (state, action) => {
                state.loading = false;
                state.getRuleFilds = action.payload.data;
            })
            .addCase(getAllRulesFilds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            .addCase(getRuleByID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRuleByID.fulfilled, (state, action) => {
                state.loading = false;
                state.getRule = action.payload.data;
            })
            .addCase(getRuleByID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            .addCase(handlerDeleteRules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handlerDeleteRules.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.message = action.payload?.message || "Rules deleted successfully";
            })
            .addCase(handlerDeleteRules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            .addCase(ActiveDeactiveRules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ActiveDeactiveRules.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(ActiveDeactiveRules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            })

            .addCase(InsertRules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(InsertRules.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                toast.success(action.payload.message);
            })
            .addCase(InsertRules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            })
            // webhooks
            .addCase(getAllwebhooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllwebhooks.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllwebHooks = action.payload.data;
            })
            .addCase(getAllwebhooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            // Insert webHook
            .addCase(InsertWebHook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(InsertWebHook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                toast.success(action.payload.message);
            })
            .addCase(InsertWebHook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            })

            // delete webHook
            .addCase(deleteWebhook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWebhook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.message = action.payload?.message;
            })
            .addCase(deleteWebhook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            // Auto webhooks
            .addCase(getAutowebhook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAutowebhook.fulfilled, (state, action) => {
                state.loading = false;
                state.AutowebHook = action.payload.data;
            })
            .addCase(getAutowebhook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            // Insert AutowebHook
            .addCase(InsertAutoWebHook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(InsertAutoWebHook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                toast.success(action.payload.message);
            })
            .addCase(InsertAutoWebHook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action.error.message);
            })

            // delete webHook
            .addCase(deleteAutoWebhook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAutoWebhook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.message = action.payload?.message;
            })
            .addCase(deleteAutoWebhook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

    }
})

export const { resetStatus } = SettingsSlice.actions
export default SettingsSlice.reducer