import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const apiCustomerList = createAsyncThunk(
//     "ticket/apiCustomerList",
//     async () => {
//         const res = await axios.get('/customer');
//         return res.data;
//     }
// )

// export const apiCustomerShow = createAsyncThunk(
//     "customer/apiCustomerShow",
//     async ({ customer_id }) => {
//         const res = await axios.get(`/customer/show/${customer_id}`);
//         return res.data;
//     }
// )

export const apiTicketStore = createAsyncThunk(
    "ticket/apiTicketStore",
    async (data) => {
        const json = JSON.stringify(data);
        const res = await axios.post('/ticket/store', json);
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