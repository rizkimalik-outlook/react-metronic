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

// export const apiCustomerUpdate = createAsyncThunk(
//     "customer/apiCustomerUpdate",
//     async (customer) => {
//         const res = await axios.put('/customer/update', customer);
//         return res.data;
//     }
// )

// export const apiCustomerDelete = createAsyncThunk(
//     "customer/apiCustomerDelete",
//     async ({ customer_id }) => {
//         const res = await axios.delete(`/customer/delete/${customer_id}`);
//         return res.data;
//     }
// )

// export const apiCustomerChannel = createAsyncThunk(
//     "customer/apiCustomerChannel",
//     async () => {
//         const res = await axios.get('/customer/channel');
//         return res.data;
//     }
// )