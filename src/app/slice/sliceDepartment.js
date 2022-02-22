import { createSlice } from "@reduxjs/toolkit";
import { apiDepartmentList } from "app/services/apiDepartment";


const sliceDepartment= createSlice({
    name: "department",
    initialState: {
        departments: [],
    },
    extraReducers: {
        [apiDepartmentList.fulfilled]: (state, action) => {
            state.departments = action.payload.data
        },
    },
});

export default sliceDepartment;