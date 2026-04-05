import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../../utils/getToken';

const baseQueryWithMeta = fetchBaseQuery({
    baseUrl: 'http://139.59.5.76:8001/v1/' , // Adjust the base URL as needed || 'http://localhost:8001/v1/'
    prepareHeaders: (headers) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set("ngrok-skip-browser-warning", "true", );
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