import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "app/config";

const queryRequest = (url) => ({ url, headers: apiHeaders })

export const user = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().persistedReducer.authUser.token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    // tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => queryRequest('/user'),
            // providesTags: ['User'],
        }),
        getUserShow: builder.query({
            query: (id) => queryRequest(`/user/show/${id}`),
            // providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/user/store',
                method: 'POST',
                headers: apiHeaders,
                body: user,
            }),
            // invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/user/update`,
                method: 'PUT',
                headers: apiHeaders,
                body: user,
            }),
            // invalidatesTags: ['User'],
        }),
        /* updateUser: builder.mutation({
            query: (id, ...rest) => ({
                url: `/user/update/${id}`,
                method: 'PUT',
                headers: apiHeaders,
                body: rest,
            }),
            // invalidatesTags: ['User'],
        }), */
        deleteUser: builder.mutation({
            query: id => ({
                url: `/user/delete/${id}`,
                method: 'DELETE',
                headers: apiHeaders,
            }),
            // invalidatesTags: ['User'],
        }),
        resetPassword: builder.mutation({
            query: (user) => ({
                url: `/user/reset_password`,
                method: 'PUT',
                headers: apiHeaders,
                body: user,
            }),
        }),
    })
});

export const {
    useGetUsersQuery,
    useGetUserShowQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useResetPasswordMutation,
} = user;
export default user;
