import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiHeaders } from "app/config";

const queryRequest = (url) => ({ url, headers: apiHeaders })

export const user_level = createApi({
    reducerPath: 'user_level',
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
        getUserLevel: builder.query({
            query: () => queryRequest('/user_level'),
        }),
    })
});

export const {
    useGetUserLevelQuery,
} = user_level;
