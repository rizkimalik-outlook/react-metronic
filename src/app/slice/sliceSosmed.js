import { createSlice } from "@reduxjs/toolkit";
import { getListCustomer, getLoadConversation, getEndChat } from 'app/services/apiSosmed'

const sosmedSlice = createSlice({
    name: "sosialmedia",
    initialState: {
        status: {
            connected: false,
            socket_id: null
        },
        selected_customer: {},
        list_customers: [],
        conversations: [],
    },
    reducers: {
        setSocketStatus: (state, action) => {
            state.status = action.payload;
        },
        setSelectedCustomer: (state, action) => {
            state.selected_customer = action.payload;
        },
    },
    extraReducers: {
        [getListCustomer.fulfilled]: (state, action) => {
            state.list_customers = action.payload
        },
        [getLoadConversation.fulfilled]: (state, action) => {
            state.conversations = action.payload
        },
        [getEndChat.fulfilled]: (state, action) => {
            state.conversations = []
        },
    },
});

//export actions & reducer
export const {
    setSocketStatus,
    setSelectedCustomer,
} = sosmedSlice.actions;
export default sosmedSlice;