import { createSlice } from "@reduxjs/toolkit";
import {
    apiMasterChannel,
    apiMasterStatus,
} from "app/services/apiMasterData";

const sliceMasterData = createSlice({
    name: "master",
    initialState: {
        channels: [],
        status: [],
    },
    extraReducers: {
        [apiMasterChannel.fulfilled]: (state, action) => {
            state.channels = action.payload.data
        },
        [apiMasterStatus.fulfilled]: (state, action) => {
            state.status = action.payload.data
        },
    },
});

export default sliceMasterData;