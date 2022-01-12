import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiMasterChannel = createAsyncThunk(
    "master/apiMasterChannel",
    async () => {
        const res = await axios.get('/master/channel');
        return res.data;
    }
)