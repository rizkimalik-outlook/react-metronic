import { createSlice } from "@reduxjs/toolkit";
import { getMenu } from 'app/services/menuApi';

const menuSlice = createSlice({
    name: "mainmenu",
    initialState: {
        menu: [],
        status: ''
    },
    extraReducers: {
        [getMenu.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMenu.fulfilled]: (state, action) => {
            state.menu = action.payload
            state.status = 'success'
        },
        [getMenu.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
});

export default menuSlice.reducer;