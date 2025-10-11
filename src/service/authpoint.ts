import baseApi from "./baseapi/baseapi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: { email: string, password: string }) => ({
                url: 'admin/login',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useLoginMutation } = authApi