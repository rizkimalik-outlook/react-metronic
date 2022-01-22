import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiTicketList = createAsyncThunk(
    "ticket/apiTicketList",
    async () => {
        const res = await axios.get('/ticket');
        return res.data;
    }
)

export const apiTicketStore = createAsyncThunk(
    "ticket/apiTicketStore",
    async (data) => {
        const json = JSON.stringify(data);
        const res = await axios.post('/ticket/store', json);
        return res.data;
    }
)

export const apiHistoryTransaction = createAsyncThunk(
    "ticket/apiHistoryTransaction",
    async ({ customer_id }) => {
        const res = await axios.get(`/ticket/history_transaction/${customer_id}`);
        return res.data;
    }
)

export const apiPublish = createAsyncThunk(
    "ticket/apiPublish",
    async ({ customer_id }) => {
        const json = JSON.stringify({ customer_id });
        const res = await axios.post(`/ticket/publish`, json);
        return res.data;
    }
)

export const apiDataPublish = createAsyncThunk(
    "ticket/apiDataPublish",
    async ({ customer_id }) => {
        const res = await axios.get(`/ticket/data_publish/${customer_id}`);
        return res.data;
    }
)
