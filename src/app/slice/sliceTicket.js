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
        history_transaction: [],
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selected_customer = action.payload;
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
} = ticketSlice.actions;
export default ticketSlice;