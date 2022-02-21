import { createSlice } from "@reduxjs/toolkit";
import { 
    apiCategoryList, 
    apiCategoryShow, 
    apiCategoryStore, 
    apiCategoryUpdate, 
    apiCategoryDelete, 
    apiSubCategoryLv1, 
    apiSubCategoryLv1Show, 
    apiSubCategoryLv1Store, 
    apiSubCategoryLv1Update, 
    apiSubCategoryLv1Delete, 
    apiSubCategoryLv2,
    apiSubCategoryLv2Show, 
    apiSubCategoryLv2Store, 
    apiSubCategoryLv2Update, 
    apiSubCategoryLv2Delete, 
    apiSubCategoryLv3,
    apiSubCategoryLv3Show, 
    apiSubCategoryLv3Store, 
    apiSubCategoryLv3Update, 
    apiSubCategoryLv3Delete
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
        [apiCategoryShow.fulfilled]: (state, action) => {
            state.response = action.payload.data
        },
        [apiCategoryStore.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiCategoryUpdate.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiCategoryDelete.fulfilled]: (state, action) => {
            state.response = action.payload
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
        [apiSubCategoryLv2Show.fulfilled]: (state, action) => {
            state.response = action.payload.data
        },
        [apiSubCategoryLv2Store.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv2Update.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv2Delete.fulfilled]: (state, action) => {
            state.response = action.payload
        },

        //? Category LV3
        [apiSubCategoryLv3.fulfilled]: (state, action) => {
            state.category_sublv3 = action.payload.data
        },
        [apiSubCategoryLv3Show.fulfilled]: (state, action) => {
            state.category_sublv3_detail = action.payload.data[0]
            state.response = action.payload.data
        },
        [apiSubCategoryLv3Store.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv3Update.fulfilled]: (state, action) => {
            state.response = action.payload
        },
        [apiSubCategoryLv3Delete.fulfilled]: (state, action) => {
            state.response = action.payload
        },
    },
});

export default sliceCategory;