import { createSlice } from "@reduxjs/toolkit";
import { getMainMenu } from "app/services/apiMenu";

const sliceMenu = createSlice({
    name: "mainmenu",
    initialState: {
        main_menu: [],
    },
    extraReducers: {
        [getMainMenu.fulfilled]: (state, action) => {
            state.main_menu = action.payload.data
        },
    },
});

export default sliceMenu;