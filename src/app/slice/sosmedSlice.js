import { createSlice } from "@reduxjs/toolkit";
import { getListCustomer } from 'app/services/sosmedApi'

const sosmedSlice = createSlice({
    name: "sosialmedia",
    initialState: {
        list_customers: [],
        status: null
    },
    extraReducers: {
        [getListCustomer.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getListCustomer.fulfilled]: (state, action) => {
            state.list_customers = action.payload
            state.status = 'success'
        },
        [getListCustomer.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
});

export default sosmedSlice.reducer;