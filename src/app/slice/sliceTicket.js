import { createSlice } from "@reduxjs/toolkit";
import { apiTicketStore } from "app/services/apiTicket";

const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        selected_customer: {},
        response: {},
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
    },
});

//export actions & reducer
export const {
    setSelectedCustomer,
} = ticketSlice.actions;
export default ticketSlice;