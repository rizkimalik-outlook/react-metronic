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

export const apiTicketUpdate = createAsyncThunk(
    "ticket/apiTicketUpdate",
    async (data) => {
        const res = await axios.put('/ticket/update', data);
        return res.data;
    }
)

export const apiTicketShow = createAsyncThunk(
    "ticket/apiTicketShow",
    async ({ ticket_number }) => {
        const res = await axios.get(`/ticket/show/${ticket_number}`);
        return res.data;
    }
)

export const apiHistoryTransaction = createAsyncThunk(
    "ticket/apiHistoryTransaction",
    async ({ customer_id }) => {
        const res = await axios.get(`/ticket/transaction/${customer_id}`);
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
        const res = await axios.get(`/ticket/publish/${customer_id}`);
        return res.data;
    }
)

export const apiInteraction = createAsyncThunk(
    "ticket/apiInteraction",
    async ({ ticket_number }) => {
        const res = await axios.get(`/ticket/interaction/${ticket_number}`);
        return res.data;
    }
)

export const apiEscalation = createAsyncThunk(
    "ticket/apiEscalation",
    async (data) => {
        const res = await axios.put(`/ticket/escalation`, data);
        return res.data;
    }
)

export const apiHistoryTicket = createAsyncThunk(
    "ticket/apiHistoryTicket",
    async (data) => {
        // const json = JSON.stringify(data);
        const res = await axios.post(`/ticket/history`, data);
        return res.data;
    }
)
