import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({ query: () => "api/users" }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
