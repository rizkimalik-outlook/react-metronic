import { createSlice } from "@reduxjs/toolkit";
import { apiOrganizationList } from "app/services/apiOrganization";


const sliceOrganization= createSlice({
    name: "organization",
    initialState: {
        organizations: [],
    },
    extraReducers: {
        [apiOrganizationList.fulfilled]: (state, action) => {
            state.organizations = action.payload.data
        },
    },
});

export default sliceOrganization;