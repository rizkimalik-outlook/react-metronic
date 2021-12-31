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
        userSocket: builder.mutation({
            query: (body) => ({
                url: '/auth/user_socket',
                method: 'PUT',
                headers: apiHeaders,
                body,
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useUserSocketMutation
} = auth;