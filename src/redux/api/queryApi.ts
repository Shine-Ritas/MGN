import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config";
import { EncryptStorage } from "@/utilities/encrypt-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl, // Your API base URL
  prepareHeaders: (headers) => {
    const encryptStorage = new EncryptStorage(config.secretKey);

    const token = encryptStorage.get("auth-token") || "";

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");

    return headers;
  },
},


);

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery,
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    getData: builder.query<any, string>({
      query: (url: string) => {
        return {
          url,
          headers: { "Content-Type": "application/json" },
      };
      } ,
      keepUnusedDataFor: 3600,
      providesTags: ["Data"],
     
    }),
    postData: builder.mutation<any, any>({
      query: ({ url, body, method }) => {
        return {
          // headers: { "Content-Type": "multipart/form-data" },
          url,
          method: method || "POST", 
          body: body,
          redirect: "manual",
        };
      },
      
      invalidatesTags: ["Data"],
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
} = queryApi;
