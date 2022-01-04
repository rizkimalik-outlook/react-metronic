import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomerList = createAsyncThunk(
    "customer/getCustomerList",
    async () => {
        const res = await axios.get('/customer');
        return res.data;
    }
)

export const getCustomerShow = createAsyncThunk(
    "customer/getCustomerShow",
    async ({ id }) => {
        const res = await axios.get(`/customer/${id}`);
        return res.data;
    }
)

// export const getEndChat = createAsyncThunk(
//     "customer/getEndChat",
//     async ({ chat_id }) => {
//         const res = await axios.post('/sosmed/end_chat', { chat_id });
//         return res.data;
//     }
// )