import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import backend from "../constants/backend";

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

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Vehicles','User'],

    // Allows injection of other redux slices
    endpoints: builder => ({})

});