import { createSlice } from "@reduxjs/toolkit";
import {
    apiTicketStore,
    apiHistoryTransaction,
    apiPublish,
    apiDataPublish,
} from "app/services/apiTicket";

const sliceTicket = createSlice({
    name: "ticket",
    initialState: {
        response: {},
        selected_customer: {},
        reporting_customer: {},
        history_transaction: [],
        data_publish: [],
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selected_customer = action.payload;
        },
        setReportingCustomer: (state, action) => {
            state.reporting_customer = action.payload;
        },
    },
    extraReducers: {
        [apiTicketStore.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiHistoryTransaction.fulfilled]: (state, action) => {
            state.history_transaction = action.payload.data
        },
        [apiPublish.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiDataPublish.fulfilled]: (state, action) => {
            state.data_publish = action.payload.data
        },
    },
});

//export actions & reducer
export const {
    setSelectedCustomer,
    setReportingCustomer,
} = sliceTicket.actions;
export default sliceTicket;