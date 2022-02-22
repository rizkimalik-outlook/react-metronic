import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiMasterChannel = createAsyncThunk(
    "master/apiMasterChannel",
    async () => {
        const res = await axios.get('/master/channel');
        return res.data;
    }
)

export const apiMasterStatus = createAsyncThunk(
    "master/apiMasterStatus",
    async () => {
        const res = await axios.get('/master/status');
        return res.data;
    }
)

export const apiMasterUserLevel = createAsyncThunk(
    "master/apiMasterUserLevel",
    async () => {
        const res = await axios.get('/master/user_level');
        return res.data;
    }
)

export const apiOrganization = createAsyncThunk(
    "master/apiOrganization",
    async () => {
        const res = await axios.get('/organization');
        return res.data;
    }
)

export const apiDepartment = createAsyncThunk(
    "master/apiDepartment",
    async () => {
        const res = await axios.get('/department');
        return res.data;
    }
)
