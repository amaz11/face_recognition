
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getTokenFromLocalStorage } from "../utils/getToken";
import baseApi from "./baseapi/baseapi";

const endPointAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getData: builder.query<any, { endpoint: string, tags?: string[] }>({
            query: ({ endpoint }: { endpoint: string }) => ({
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                },
                url: `${endpoint}`,
                method: "GET",
            }),
            providesTags: (_result: any, _error: FetchBaseQueryError | undefined, { tags }) =>
                tags ? tags.map(tag => ({ type: tag as string })) : [] as any,
        }),
        postData: builder.mutation<any, { endpoint: string, data: any, tags?: string[] }>({
            query: (data: { endpoint: string, data: any }) => ({
                url: `${data.endpoint}`,
                method: "POST",
                body: data.data,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                },
            }),
            invalidatesTags: (_result: any, _error: FetchBaseQueryError | undefined, { tags }: { endpoint: string; data: any; tags?: string[] | undefined; }) =>
                tags ? tags.map(tag => ({ type: tag as string })) : [] as any,
        }),

        postFile: builder.mutation<any, { endpoint: string, data: any, tags?: string[] }>({
            query: (data: { endpoint: string, data: any }) => ({
                url: `${data.endpoint}`,
                method: "POST",
                body: data.data,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,

                },
            }),
            invalidatesTags: (_result: any, _error: FetchBaseQueryError | undefined, { tags }: { endpoint: string; data: any; tags?: string[] | undefined; }) =>
                tags ? tags.map(tag => ({ type: tag as string })) : [] as any,
        }),

        deleteData: builder.mutation<any, { endpoint: string, tags?: string[] }>(
            {
                query: (data: { endpoint: string }) => ({
                    url: `${data.endpoint}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage()}`
                    },
                }),
                invalidatesTags: (_result: any, _error: FetchBaseQueryError | undefined, { tags }) =>
                    tags ? tags.map(tag => ({ type: tag as string })) : [] as any,
            }
        ),

        updateData: builder.mutation<any, { endpoint: string, data: any, tags?: string[] }>({
            query: (data) => ({
                url: `${data.endpoint}`,
                method: "PUT",
                body: data.data,
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }),
            invalidatesTags: (_result: any, error: FetchBaseQueryError | undefined, { tags }) => {
                if (error?.status === 422) {
                    return [{ type: "Error", id: "422" }]
                }
                return tags ? tags.map(tag => ({ type: tag as string })) : [] as any
            },

        })
    })
})

export const { useGetDataQuery, usePostDataMutation, useDeleteDataMutation, useUpdateDataMutation, usePostFileMutation } = endPointAPI
