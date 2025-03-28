import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    prepareHeaders: (headers) => {
      const { token } = JSON.parse(Cookies.get("session"));
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (queryParams) => `/users?${queryParams}`,
    }),
    getUserData: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (res) => res?.data,
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/adminonlyuserupdates`,
        method: "PUT",
        body: data,
      }),
    }),
    getSystemBalance: builder.query({
      query: () => "/users/systembalance",
      transformResponse: (res) => res.totalBalance,
    }),
    getTransactions: builder.query({
      query: (url) => url,
    }),
    addTransaction: builder.mutation({
      query: ({ url, data }) => ({
        url: `/transactions/${url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetTransactionsQuery,
  useGetUserDataQuery,
  useGetSystemBalanceQuery,
  useAddTransactionMutation,
  useUpdateUserStatusMutation,
  useUpdateTransactionMutation,
} = baseApi;
