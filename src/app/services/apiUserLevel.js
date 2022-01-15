import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiUserLevel = createAsyncThunk(
    "user/apiUserLevel",
    async () => {
        const res = await axios.get('/master/user_level');
        return res.data;
    }
)