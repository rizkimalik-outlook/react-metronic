import { createSlice } from "@reduxjs/toolkit";
import {
    apiCustomerList,
    apiCustomerShow,
    apiCustomerStore,
    apiCustomerUpdate,
    apiCustomerDelete
} from "app/services/apiCustomer";

const sliceCustomer = createSlice({
    name: "customer",
    initialState: {
        customers: [],
        customer: {},
        response: {},
    },
    extraReducers: {
        [apiCustomerList.fulfilled]: (state, action) => {
            state.customers = action.payload.data
        },
        [apiCustomerShow.fulfilled]: (state, action) => {
            state.customer = action.payload.data
        },
        [apiCustomerStore.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiCustomerUpdate.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiCustomerDelete.fulfilled]: (state, action) => {
            state.response = action.payload
        },
    },
});

export default sliceCustomer;