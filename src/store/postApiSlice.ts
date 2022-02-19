import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({ query: () => "api/posts" }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
