import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "middleware/api";

const queryRequest = (url) => ({ url, headers: apiHeaders })

export const user = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => queryRequest('/user'),
            providesTags: ['User'],
        }),
        getUserShow: builder.query({
            query: (id) => queryRequest(`/user/show/${id}`),
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/user/store',
                method: 'POST',
                headers: apiHeaders,
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (id, ...rest) => ({
                url: `/user/update/${id}`,
                method: 'PUT',
                headers: apiHeaders,
                body: rest,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: `/user/delete/${id}`,
                method: 'DELETE',
                headers: apiHeaders,
            }),
            invalidatesTags: ['User'],
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserShowQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = user;