import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const apiTodolistTotalTicket = createAsyncThunk(
    "todolist/apiTodolistTotalTicket",
    async (data) => {
        const res = await axios.post('/todolist/total_ticket', data);
        return res.data;
    }
)

export const apiTodolistDataTicket = createAsyncThunk(
    "todolist/apiTodolistDataTicket",
    async (data) => {
        const res = await axios.post('/todolist/data_ticket', data);
        return res.data;
    }
)
