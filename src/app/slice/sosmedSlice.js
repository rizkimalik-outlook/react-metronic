import { createSlice } from "@reduxjs/toolkit";
import { getListCustomer } from 'app/services/apiSosmed'

const sosmedSlice = createSlice({
    name: "sosialmedia",
    initialState: {
        status: 'disconnect',
        connected: false,
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
        list_customers: [],
    },
    reducers: {
        setSocketStatus: (state, action) => {
            state.status = action.payload.status;
            state.connected = action.payload.connected;
        },
        setSendMessage: (state, action) => {
            state.send_message = action.payload;
        },
    },
    extraReducers: {
        // [getListCustomer.pending]: (state, action) => {
        //     state.status = 'loading'
        // },
        [getListCustomer.fulfilled]: (state, action) => {
            state.list_customers = action.payload
            // state.status = 'success'
        },
        // [getListCustomer.rejected]: (state, action) => {
        //     state.status = 'failed'
        // },
    },
});

//export actions & reducer
export const { setSocketStatus, setSendMessage } = sosmedSlice.actions;
export default sosmedSlice.reducer;