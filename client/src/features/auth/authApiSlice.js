import { logOut } from "../auth/authSlice"; 
import { apiSlice } from "../apiSlice";
import { createSelector } from '@reduxjs/toolkit';
import {authSlice, setCredentials} from './authSlice';

// Backend Calls for Auth
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/',
                method: 'POST',
                body: {...credentials}
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    console.log("Displaying:", {data});
                    await dispatch(logOut());
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState());
                    },1000);
                } catch(err) {
                    console.log(err);
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    console.log("Displaying REFRESH:", data);
                    const {accessToken} = data;
                    await dispatch(setCredentials({accessToken}));
                } catch(err) {
                    console.log(err);
                }
            },
        }),
        
        checkToken: builder.mutation({
            query: accessToken => ({
                url: '/auth/checkToken',
                method: 'POST',
                body: {accessToken}
            }),
            validateStatus: (response) => {return response.status},
        }),

        getData: builder.query({
            query: (path) => ({
                url: path,
                method: 'GET'
            }),
            keepUnusedDataFor: 5,
            transformResponse: (response) => {
                // console.log("FROM AUTHAPISLICE:", response)
                const data = response.map((v) => {
                    return v;
                })
                return data;
            },
        }),
    })
});
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation, useCheckTokenMutation, useGetDataQuery} = authApiSlice;
