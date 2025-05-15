import axios from "axios";
import { ACTIVE_CHATBOT, ACTIVE_MEETING, DELETE_CHATBOT, DELETE_MEETING, GET_ACTIVEDEACTIVE_MEETINGS, GET_CHATBOT, GET_CHATBOTUSER, GET_CONVERSATION, GET_MEETINGBYID, GETALL_CHATBOT, GETALL_MEETINGS, GETBYID_CHATBOTUSER, INSERT_CHATBOT, INSERT_MEETING } from "../Components/Common/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllChatbot = createAsyncThunk("chat/getAllChatbot", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETALL_CHATBOT}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getAllChatbotUser = createAsyncThunk("chat/getAllChatbotUser", async (payload, thunkAPI) => {
    try {

        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_CHATBOTUSER}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getAllMeetings = createAsyncThunk("chat/getAllMeetings", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETALL_MEETINGS}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getActiveMeetings = createAsyncThunk("chat/getActiveMeetings", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${GET_ACTIVEDEACTIVE_MEETINGS}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getChatbootByID = createAsyncThunk("chat/getChatbootByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ ChatbotID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_CHATBOT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error = ('Failed to fetch data ');
        throw error;
    }
});

export const getChatbootUserByID = createAsyncThunk("chat/getChatbootUserByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ ChatbotID: payload, }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GETBYID_CHATBOTUSER}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error = ('Failed to fetch data ');
        throw error;
    }
});

export const getMeetingByID = createAsyncThunk("chat/getMeetingByID", async (payload, thunkAPI) => {
    try {
        const queryParams = new URLSearchParams({ ConversationMeetingID: payload }).toString();
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_MEETINGBYID}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    } catch (error) {
        console.log(error)
        toast.error = ('Failed to fetch data ');
        throw error;
    }
});



export const GetConversation = createAsyncThunk("chat/GetConversation", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.get(`${GET_CONVERSATION}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.log("error", error);
        toast.error('Failed to fetch data');
        throw error;
    }
});

export const getMarkAschatBoot = createAsyncThunk("chat/getMarkAschatBoot", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${ACTIVE_CHATBOT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const ActiveDeactiveMeetting = createAsyncThunk("chat/ActiveDeactiveMeetting", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const queryParams = new URLSearchParams(payload).toString();
        const response = await axios.get(`${ACTIVE_MEETING}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` }, });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch data");
        throw error;
    }
});

export const deleteChatBoot = createAsyncThunk("chat/deleteChatBoot", async (id) => {
    try {
        const queryParams = new URLSearchParams({ ChatbotID: id, }).toString();
        const response = await axios.get(`${DELETE_CHATBOT}?${queryParams}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
});
export const deleteMeeting = createAsyncThunk("chat/deleteMeeting", async (id) => {
    try {
        const queryParams = new URLSearchParams({ ConversationMeetingID: id, }).toString();
        const response = await axios.get(`${DELETE_MEETING}?${queryParams}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const InsertChatboot = createAsyncThunk("chat/InsertChatboot", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_CHATBOT, payload, { headers: { Authorization: `Bearer ${token}` }, })
        return response.data
    } catch (error) {
        console.log('error :>> ', error);
        throw error;
    }
})

export const InsertMeeting = createAsyncThunk("chat/InsertMeeting", async (payload, thunkAPI) => {
    try {
        const token = thunkAPI.getState().root.auth.token;
        const response = await axios.post(INSERT_MEETING, payload, { headers: { Authorization: `Bearer ${token}` }, })
        return response.data
    } catch (error) {
        console.log('error :>> ', error);
        throw error;
    }
})

export const geEmbedChatbot = createAsyncThunk(
    "Chatbot/geEmbedChatbot",
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
    error: null,
    token: null,
    status: "",
    message: "",
    getAllChat: [],
    getChatByID: [],
    getConversation: [],
    getchatUser: [],
    getAllchatUser: [],
    getAllMeeting: [],
    getMeeting: [],
    ActiveMeeting: [],
    geEmbedChatbot: []
};

const ChatSlice = createSlice({
    name: "Conversation",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.message = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllChatbot.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllChatbot.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllChat = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getAllChatbot.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.token = null;
        });

        builder.addCase(getChatbootByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getChatbootByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getChatByID = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getChatbootByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getChatByID = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(GetConversation.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(GetConversation.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getConversation = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(GetConversation.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.token = null;
        });

        builder.addCase(getMarkAschatBoot.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMarkAschatBoot.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(getMarkAschatBoot.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })

        builder.addCase(deleteChatBoot.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteChatBoot.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message || "Deal deleted successfully";
        });
        builder.addCase(deleteChatBoot.rejected, (state, action) => {
            state.status = "failed";
            state.message = "Failed to delete Deal";
        });

        builder.addCase(InsertChatboot.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(InsertChatboot.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
        });

        builder.addCase(InsertChatboot.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(getChatbootUserByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getChatbootUserByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getchatUser = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });
        builder.addCase(getChatbootUserByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getAllchatUser = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(getAllChatbotUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllchatUser = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getAllChatbotUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.token = null;
        });

        builder.addCase(getAllChatbotUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(deleteMeeting.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteMeeting.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(deleteMeeting.rejected, (state, action) => {
            state.status = "failed";
            state.message = "Failed to delete Deal";
        });



        builder.addCase(getAllMeetings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getAllMeetings.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getAllMeeting = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getAllMeetings.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.token = null;
        });
        builder.addCase(getActiveMeetings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getActiveMeetings.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.ActiveMeeting = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getActiveMeetings.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.token = null;
        });


        builder.addCase(getMeetingByID.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getMeetingByID.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.getMeeting = payload.data;
            state.error = null;
            state.token = payload?.data?.token;
        });

        builder.addCase(getMeetingByID.rejected, (state, { payload }) => {
            state.loading = false;
            state.getMeeting = null;
            state.error = payload ?? null;
            state.token = null;
        });

        builder.addCase(InsertMeeting.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(InsertMeeting.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            toast.success(action.payload.message);
        });

        builder.addCase(InsertMeeting.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(ActiveDeactiveMeetting.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(ActiveDeactiveMeetting.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            toast.success(action.payload.message);
        })
        builder.addCase(ActiveDeactiveMeetting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        })

        builder.addCase(geEmbedChatbot.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(geEmbedChatbot.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.geEmbedChatbot = action.payload;
            state.message = action.payload.message || "Product Add successfully";
        });
        builder.addCase(geEmbedChatbot.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.message =
                action.payload.message || "This Product is not insert try agin";
        });

    }
})

export const { resetStatus } = ChatSlice.actions
export default ChatSlice.reducer