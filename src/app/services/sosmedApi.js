import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListCustomer = createAsyncThunk(
    "sosialmedia/getListCustomer",
    async () => {
        const res = await axios.get('/sosmed/list_customers');
        return res.data;
    }
);