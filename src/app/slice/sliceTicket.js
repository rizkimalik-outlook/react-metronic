import { createSlice } from "@reduxjs/toolkit";
import { 
    apiTicketStore,
    apiHistoryTransaction
} from "app/services/apiTicket";

const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        response: {},
        selected_customer: {},
        reporting_customer: {},
        history_transaction: [],
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
    },
});

//export actions & reducer
export const {
    setSelectedCustomer,
    setReportingCustomer,
} = ticketSlice.actions;
export default ticketSlice;