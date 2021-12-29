import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListCustomer = createAsyncThunk(
    "sosialmedia/getListCustomer",
    async () => {
        const res = await axios.get('/sosmed/list_customers');
        return res.data;
    }
)

export const getLoadConversation = createAsyncThunk(
    "sosialmedia/getLoadConversation",
    async ({ chat_id }) => {
        const res = await axios.post('/sosmed/conversation_chats', { chat_id });
        return res.data;
    }
)