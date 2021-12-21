import { createSlice } from "@reduxjs/toolkit";
import { getListCustomer } from 'app/services/apiSosmed'

const sosmedSlice = createSlice({
    name: "sosialmedia",
    initialState: {
        status: {
            connected: false,
            socket_id: null
        },
        send_message: {
            chat_id: '',
            customer_id: '',
            message: '',
            name: '',
            email: '',
            user_id: '',
            agent_handle: '',
            socket_agentid: '',
            socket_custid: ''
        },
        selected_customer: {
            chat_id: '',
            customer_id: '',
            user_id: ''
        },
        list_customers: [],
    },
    reducers: {
        setSocketStatus: (state, action) => {
            state.status = action.payload;
        },
        setSelectedCustomer: (state, action) => {
            state.selected_customer = action.payload;
        },
        setSendMessage: (state, action) => {
            state.send_message = action.payload;
        },
    },
    extraReducers: {
        [getListCustomer.fulfilled]: (state, action) => {
            state.list_customers = action.payload
        },
    },
});

//export actions & reducer
export const { 
    setSocketStatus, 
    setSelectedCustomer, 
    setSendMessage } = sosmedSlice.actions;
export default sosmedSlice.reducer;