import { createSlice } from "@reduxjs/toolkit";
import { getMainMenu } from "app/services/apiMenu";

// export const getMenu = async () => {
//     const res = await axios.get('/menu');
//     return res.data;
// }

const sliceMenu = createSlice({
    name: "mainmenu",
    initialState: {
        main_menu: [],
        // menu_access: [],
    },
    extraReducers: {
        [getMainMenu.fulfilled]: (state, action) => {
            state.main_menu = action.payload.data
        },
        // [getMenuAccessData.fulfilled]: (state, action) => {
        //     state.menu_access = action.payload.data
        // },
    },
});

export default sliceMenu;