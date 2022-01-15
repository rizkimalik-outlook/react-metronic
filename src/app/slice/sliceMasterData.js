import { createSlice } from "@reduxjs/toolkit";
import {
    apiMasterChannel,
    apiMasterStatus,
    apiMasterUserLevel,
} from "app/services/apiMasterData";

const sliceMasterData = createSlice({
    name: "master",
    initialState: {
        channels: [],
        status: [],
        user_level: [],
    },
    extraReducers: {
        [apiMasterChannel.fulfilled]: (state, action) => {
            state.channels = action.payload.data
        },
        [apiMasterStatus.fulfilled]: (state, action) => {
            state.status = action.payload.data
        },
        [apiMasterUserLevel.fulfilled]: (state, action) => {
            state.user_level = action.payload.data
        },
    },
});

export default sliceMasterData;