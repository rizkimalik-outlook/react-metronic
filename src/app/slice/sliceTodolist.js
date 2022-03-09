import { createSlice } from "@reduxjs/toolkit";
import { apiTodolistDataTicket, apiTodolistTotalTicket } from "app/services/apiTodolist";


const sliceTodolist = createSlice({
    name: "todolist",
    initialState: {
        total_ticket: [],
        data_ticket: [],
    },
    extraReducers: {
        [apiTodolistTotalTicket.fulfilled]: (state, action) => {
            state.total_ticket = action.payload.data
        },
        [apiTodolistDataTicket.fulfilled]: (state, action) => {
            state.data_ticket = action.payload.data
        },
    },
});

export default sliceTodolist;