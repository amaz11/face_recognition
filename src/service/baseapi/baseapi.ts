import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../../utils/getToken';

const baseQueryWithMeta = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/v1/', // Adjust the base URL as needed
    prepareHeaders: (headers) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQuery = async (args: any, api: any, extraOptions: any) => {
    const result: any = await baseQueryWithMeta(args, api, extraOptions);
    if (result.error) {
        return {
            ...result,
            meta: result.error.meta,
        };
    }
    return {
        ...result,
        meta: result.meta,
    };
};


const baseapi = createApi({
    reducerPath: 'facerecognitionapp',
    baseQuery: baseQuery,
    endpoints: (_builder) => ({}),
})

export default baseapi