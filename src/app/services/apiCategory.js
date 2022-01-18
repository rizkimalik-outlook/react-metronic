import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//? main catgory
export const apiCategoryList = createAsyncThunk(
    "category/apiCategoryList",
    async () => {
        const res = await axios.get('/category');
        return res.data;
    }
)
/* 
export const apiCustomerShow = createAsyncThunk(
    "customer/apiCustomerShow",
    async ({ customer_id }) => {
        const res = await axios.get(`/customer/show/${customer_id}`);
        return res.data;
    }
)

export const apiCustomerStore = createAsyncThunk(
    "customer/apiCustomerStore",
    async (customer) => {
        const json = JSON.stringify(customer);
        const res = await axios.post('/customer/store', json);
        return res.data;
    }
)

export const apiCustomerUpdate = createAsyncThunk(
    "customer/apiCustomerUpdate",
    async (customer) => {
        const res = await axios.put('/customer/update', customer);
        return res.data;
    }
)

export const apiCustomerDelete = createAsyncThunk(
    "customer/apiCustomerDelete",
    async ({ customer_id }) => {
        const res = await axios.delete(`/customer/delete/${customer_id}`);
        return res.data;
    }
)

export const apiCustomerChannel = createAsyncThunk(
    "customer/apiCustomerChannel",
    async () => {
        const res = await axios.get('/customer/channel');
        return res.data;
    }
) */

//? sub-catgory lv1
export const apiSubCategoryLv1 = createAsyncThunk(
    "category/apiSubCategoryLv1",
    async ({ category_id }) => {
        const res = await axios.get(`/categorysublv1/${category_id}`);
        return res.data;
    }
)

//? sub-catgory lv2
export const apiSubCategoryLv2 = createAsyncThunk(
    "category/apiSubCategoryLv2",
    async ({ category_sublv1_id }) => {
        const res = await axios.get(`/categorysublv2/${category_sublv1_id}`);
        return res.data;
    }
)

//? sub-catgory lv3
export const apiSubCategoryLv3 = createAsyncThunk(
    "category/apiSubCategoryLv3",
    async ({ category_sublv2_id }) => {
        const res = await axios.get(`/categorysublv3/${category_sublv2_id}`);
        return res.data;
    }
)
export const apiSubCategoryLv3Show = createAsyncThunk(
    "customer/apiSubCategoryLv3Show",
    async ({ category_sublv3_id }) => {
        const res = await axios.get(`/categorysublv3/show/${category_sublv3_id}`);
        return res.data;
    }
)

const storeCategory = createSlice({
    name: "category",
    initialState: {
        category: [],
        category_sublv1: [],
        category_sublv2: [],
        category_sublv3: [],
        category_sublv3_detail: {},
        response: {},
    },
    extraReducers: {
        [apiCategoryList.fulfilled]: (state, action) => {
            state.category = action.payload.data
        },
        [apiSubCategoryLv1.fulfilled]: (state, action) => {
            state.category_sublv1 = action.payload.data
        },
        [apiSubCategoryLv2.fulfilled]: (state, action) => {
            state.category_sublv2 = action.payload.data
        },
        [apiSubCategoryLv3.fulfilled]: (state, action) => {
            state.category_sublv3 = action.payload.data
        },
        [apiSubCategoryLv3Show.fulfilled]: (state, action) => {
            state.category_sublv3_detail = action.payload.data[0]
        },
    },
});

export default storeCategory;