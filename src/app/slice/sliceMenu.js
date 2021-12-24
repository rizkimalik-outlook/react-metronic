import { createSlice } from "@reduxjs/toolkit";
import { getMenu } from "app/services/apiMenu";

// export const getMenu = async () => {
//     const res = await axios.get('/menu');
//     return res.data;
// }

const sliceMenu = createSlice({
    name: "mainmenu",
    initialState: {
        menu: []
    },
    extraReducers: {
        [getMenu.fulfilled]: (state, action) => {
            state.menu = action.payload.data
        },
    },
});

export default sliceMenu.reducer;