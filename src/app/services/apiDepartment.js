import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiDepartmentList = createAsyncThunk(
    "department/apiDepartmentList",
    async () => {
        const res = await axios.get('/department');
        return res.data;
    }
)

// export const apiCustomerShow = createAsyncThunk(
//     "organization/apiCustomerShow",
//     async ({ customer_id }) => {
//         const res = await axios.get(`/organization/show/${customer_id}`);
//         return res.data;
//     }
// )

// export const apiCustomerStore = createAsyncThunk(
//     "organization/apiCustomerStore",
//     async (customer) => {
//         const json = JSON.stringify(customer);
//         const res = await axios.post('/organization/store', json);
//         return res.data;
//     }
// )

// export const apiCustomerUpdate = createAsyncThunk(
//     "organization/apiCustomerUpdate",
//     async (customer) => {
//         const res = await axios.put('/organization/update', customer);
//         return res.data;
//     }
// )

// export const apiCustomerDelete = createAsyncThunk(
//     "organization/apiCustomerDelete",
//     async ({ customer_id }) => {
//         const res = await axios.delete(`/organization/delete/${customer_id}`);
//         return res.data;
//     }
// )

// export const apiCustomerChannel = createAsyncThunk(
//     "organization/apiCustomerChannel",
//     async () => {
//         const res = await axios.get('/organization/channel');
//         return res.data;
//     }
// )