import { createSlice } from "@reduxjs/toolkit";
import { getCustomerList } from "app/services/apiCustomer";

const sliceCustomer = createSlice({
    name: "customer",
    initialState: {
        customers: [],
    },
    extraReducers: {
        [getCustomerList.fulfilled]: (state, action) => {
            state.customers = action.payload.data
        },
    },
});

export default sliceCustomer;