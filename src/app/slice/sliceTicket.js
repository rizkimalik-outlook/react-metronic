import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        selected_customer: {},
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selected_customer = action.payload;
        },
    },
    extraReducers: {
        // [getListCustomer.fulfilled]: (state, action) => {
        //     state.list_customers = action.payload
        // },
    },
});

//export actions & reducer
export const {
    setSelectedCustomer,
} = ticketSlice.actions;
export default ticketSlice;