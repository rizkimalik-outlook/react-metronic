import { createSlice } from "@reduxjs/toolkit";
import { 
    apiCategoryList, 
    apiSubCategoryLv1, 
    apiSubCategoryLv1Show, 
    apiSubCategoryLv1Store, 
    apiSubCategoryLv1Update, 
    apiSubCategoryLv1Delete, 
    apiSubCategoryLv2,
    apiSubCategoryLv3,
    apiSubCategoryLv3Show
} from "app/services/apiCategory";

const sliceCategory = createSlice({
    name: "category",
    initialState: {
        response: {},
        category: [],
        category_sublv1: [],
        category_sublv2: [],
        category_sublv3: [],
        category_sublv3_detail: {},
    },
    extraReducers: {
        //? Category
        [apiCategoryList.fulfilled]: (state, action) => {
            state.category = action.payload.data
        },

        //? Category LV1
        [apiSubCategoryLv1.fulfilled]: (state, action) => {
            state.category_sublv1 = action.payload.data
        },
        [apiSubCategoryLv1Show.fulfilled]: (state, action) => {
            state.response = action.payload.data
        },
        [apiSubCategoryLv1Store.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv1Update.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv1Delete.fulfilled]: (state, action) => {
            state.response = action.payload
        },

        //? Category LV2
        [apiSubCategoryLv2.fulfilled]: (state, action) => {
            state.category_sublv2 = action.payload.data
        },

        //? Category LV3
        [apiSubCategoryLv3.fulfilled]: (state, action) => {
            state.category_sublv3 = action.payload.data
        },
        [apiSubCategoryLv3Show.fulfilled]: (state, action) => {
            state.category_sublv3_detail = action.payload.data[0]
        },
    },
});

export default sliceCategory;