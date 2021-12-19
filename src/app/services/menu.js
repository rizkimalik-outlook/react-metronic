import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "middleware/api";

const queryRequest = (url) => ({ url, headers: apiHeaders })

export const menu = createApi({
    reducerPath: 'menu',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: () => queryRequest('/menu')
        }),
        
    })
});

export const {
    useGetMenuQuery,
} = menu;