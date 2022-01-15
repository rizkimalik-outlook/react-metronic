import { createSlice } from "@reduxjs/toolkit";
import { apiUserLevel } from "app/services/apiUserLevel";


const sliceUser = createSlice({
    name: "user_level",
    initialState: {
        user_level: [],
    },
    extraReducers: {
        [apiUserLevel.fulfilled]: (state, action) => {
            state.user_level = action.payload.data
        },
    },
});

export default sliceUser;