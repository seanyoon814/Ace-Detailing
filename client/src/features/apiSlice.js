import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import backend from "../constants/backend";
import { setCredentials } from './auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: `${backend.apiUrl}`,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if(token){
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReuth = async (args,apiSlice, extraOptions) => {
    // console.log(args) // request url, method, body
    // // console.log(backend.apiUrl)
    // console.log(apiSlice) // signal, dispatch, getState()
    
    let result = await baseQuery(args,apiSlice,extraOptions);
    if(result?.error?.status === 403 || result?.error?.originalStatus === 403) {
        console.log("Token Expired getting refresh token")

        const refreshResult = await baseQuery('/auth/refresh',apiSlice,extraOptions)
        if(refreshResult?.data){
            apiSlice.dispatch(setCredentials({ ...refreshResult.data }));
            result = await baseQuery(args,apiSlice,extraOptions);
        } else {
            if(refreshResult?.error?.status === 403){
                refreshResult.error.data.message = "Your login has expired. Please login again. "
            }
            return refreshResult;
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReuth,

    // Allows injection of other redux slices
    endpoints: builder => ({})

});