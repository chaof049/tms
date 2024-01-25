import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/config";

export const botApi = createApi({
  reducerPath: "botApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["readBot"],

  endpoints: (builder) => ({
    readBots: builder.query({
      query: () => {
        return {
          url: "/bots",
          method: "GET",
        };
      },
      providesTags: ["readBot"],
    }),
  }),
});

export const { useReadBotsQuery } = botApi;
