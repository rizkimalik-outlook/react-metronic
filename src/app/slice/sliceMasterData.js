import { createSlice } from "@reduxjs/toolkit";
import {
    apiMasterChannel,
} from "app/services/apiMasterData";

const sliceMasterData = createSlice({
    name: "master",
    initialState: {
        channels: [],
    },
    extraReducers: {
        [apiMasterChannel.fulfilled]: (state, action) => {
            state.channels = action.payload.data
        },
    },
});

export default sliceMasterData;