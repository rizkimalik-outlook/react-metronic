import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "app/config";
import axios from "axios";

const queryRequest = (url) => ({ url, headers: apiHeaders })

export const getMainMenu = createAsyncThunk(
    "mainmenu/main_menu",
    async () => {
        const res = await axios.get('/main_menu');
        return res.data;
    }
);


export const menu_access = createApi({
    reducerPath: 'menu_access',
    baseQuery: fetchBaseQuery({
        baseUrl, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().persistedReducer.authUser.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: () => queryRequest(`/menu`),
        }),
        getMenuModul: builder.query({
            query: (menu_id) => queryRequest(`/menu_modul/${menu_id}`),
        }),
        getMenuSubModul: builder.query({
            query: (menu_modul_id) => queryRequest(`/menu_submodul/${menu_modul_id}`),
        }),
        getMenuAccess: builder.query({
            query: (user_level) => queryRequest(`/menu_access?user_level=${user_level}`),
        }),
        getModulAccess: builder.query({
            query: ({user_level, menu_id}) => queryRequest(`/modul_access?user_level=${user_level}&menu_id=${menu_id}`),
        }),
        createMenuAccess: builder.mutation({
            query: (body) => ({
                url: '/store_access',
                method: 'POST',
                headers: apiHeaders,
                body,
            }),
        }),
        deleteMenuAccess: builder.mutation({
            query: (id) => ({
                url: `/delete_access/${id}`,
                method: 'DELETE',
                headers: apiHeaders,
            }),
        }),
    })
});

export const {
    useGetMenuQuery,
    useGetMenuModulQuery,
    useGetMenuSubModulQuery,
    useGetMenuAccessQuery,
    useGetModulAccessQuery,
    useCreateMenuAccessMutation,
    useDeleteMenuAccessMutation,
} = menu_access;
export default menu_access;

// export const getMenuAccess = async (user_level) => {
//     const res = await axios.post('/menu_access', {
//         user_level:user_level
//     });
//     return res.data;
// }

/* export const getMenuAccess = createAsyncThunk(
    "mainmenu/menu_access",
    async (user_level, thunkAPI) => {
        const res = await axios.post('/menu_access', {
            user_level:user_level
        });
        return res.data;
    }
); */
