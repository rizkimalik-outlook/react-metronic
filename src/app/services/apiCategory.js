import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//? main catgory
export const apiCategoryList = createAsyncThunk(
    "category/apiCategoryList",
    async () => {
        const res = await axios.get('/category');
        return res.data;
    }
)

export const apiCategoryShow = createAsyncThunk(
    "category/apiCategoryShow",
    async ({ category_id }) => {
        const res = await axios.get(`/category/show/${category_id}`);
        return res.data;
    }
)

export const apiCategoryStore = createAsyncThunk(
    "category/apiCategoryStore",
    async (data) => {
        const res = await axios.post('/category/store', data);
        return res.data;
    }
)

export const apiCategoryUpdate = createAsyncThunk(
    "category/apiCategoryUpdate",
    async (category) => {
        const res = await axios.put('/category/update', category);
        return res.data;
    }
)

export const apiCategoryDelete = createAsyncThunk(
    "category/apiCategoryDelete",
    async ({ category_id }) => {
        const res = await axios.delete(`/category/delete/${category_id}`);
        return res.data;
    }
)


//? sub-catgory lv1
export const apiSubCategoryLv1 = createAsyncThunk(
    "category/apiSubCategoryLv1",
    async ({ category_id }) => {
        const res = await axios.get(`/categorysublv1/${category_id}`);
        return res.data;
    }
)

export const apiSubCategoryLv1Show = createAsyncThunk(
    "category/apiSubCategoryLv1Show",
    async ({ category_sublv1_id }) => {
        const res = await axios.get(`/categorysublv1/show/${category_sublv1_id}`);
        return res.data;
    }
)

export const apiSubCategoryLv1Store = createAsyncThunk(
    "category/apiSubCategoryLv1Store",
    async (data) => {
        const res = await axios.post(`/categorysublv1/store`, data);
        return res.data;
    }
)

export const apiSubCategoryLv1Update = createAsyncThunk(
    "category/apiSubCategoryLv1Update",
    async (data) => {
        const res = await axios.put('/categorysublv1/update', data);
        return res.data;
    }
)

export const apiSubCategoryLv1Delete = createAsyncThunk(
    "category/apiSubCategoryLv1Delete",
    async ({ category_sublv1_id }) => {
        const res = await axios.delete(`/categorysublv1/delete/${category_sublv1_id}`);
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

export const apiSubCategoryLv2Show = createAsyncThunk(
    "category/apiSubCategoryLv2Show",
    async ({ category_sublv2_id }) => {
        const res = await axios.get(`/categorysublv2/show/${category_sublv2_id}`);
        return res.data;
    }
)

export const apiSubCategoryLv2Store = createAsyncThunk(
    "category/apiSubCategoryLv2Store",
    async (data) => {
        const res = await axios.post(`/categorysublv2/store`, data);
        return res.data;
    }
)

export const apiSubCategoryLv2Update = createAsyncThunk(
    "category/apiSubCategoryLv2Update",
    async (data) => {
        const res = await axios.put('/categorysublv2/update', data);
        return res.data;
    }
)

export const apiSubCategoryLv2Delete = createAsyncThunk(
    "category/apiSubCategoryLv2Delete",
    async ({ category_sublv2_id }) => {
        const res = await axios.delete(`/categorysublv2/delete/${category_sublv2_id}`);
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
    "category/apiSubCategoryLv3Show",
    async ({ category_sublv3_id }) => {
        const res = await axios.get(`/categorysublv3/show/${category_sublv3_id}`);
        return res.data;
    }
)

export const apiSubCategoryLv3Store = createAsyncThunk(
    "category/apiSubCategoryLv3Store",
    async (data) => {
        const res = await axios.post(`/categorysublv3/store`, data);
        return res.data;
    }
)

export const apiSubCategoryLv3Update = createAsyncThunk(
    "category/apiSubCategoryLv3Update",
    async (data) => {
        const res = await axios.put('/categorysublv3/update', data);
        return res.data;
    }
)

export const apiSubCategoryLv3Delete = createAsyncThunk(
    "category/apiSubCategoryLv3Delete",
    async ({ category_sublv3_id }) => {
        const res = await axios.delete(`/categorysublv3/delete/${category_sublv3_id}`);
        return res.data;
    }
)

