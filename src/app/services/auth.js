import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "app/config";

export const auth = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                headers: apiHeaders,
                body: user,
            })
        }),
        logout: builder.mutation({
            query: (user) => ({
                url: '/auth/logout',
                method: 'POST',
                headers: apiHeaders,
                body: user,
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation
} = auth;