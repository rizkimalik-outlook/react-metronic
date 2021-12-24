import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getMenu = async () => {
//     const res = await axios.get('/menu');
//     return res.data;
// }

export const getMenu = createAsyncThunk(
    "mainmenu/menu",
    async () => {
        const res = await axios.get('/menu');
        return res.data;
    }
);
