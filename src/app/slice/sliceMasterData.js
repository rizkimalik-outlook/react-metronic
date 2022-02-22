import { createSlice } from "@reduxjs/toolkit";
import {
    apiDepartment,
    apiMasterChannel,
    apiMasterStatus,
    apiMasterUserLevel,
    apiOrganization,
} from "app/services/apiMasterData";

const sliceMasterData = createSlice({
    name: "master",
    initialState: {
        channels: [],
        status: [],
        user_level: [],
        organizations: [],
        departments: [],
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
        [apiOrganization.fulfilled]: (state, action) => {
            state.organizations = action.payload.data
        },
        [apiDepartment.fulfilled]: (state, action) => {
            state.departments = action.payload.data
        },
    },
});

export default sliceMasterData;