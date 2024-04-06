import { logOut } from "../auth/authSlice"; 
import { apiSlice } from "../apiSlice";
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
                    await dispatch(apiSlice.util.resetApiState());
                } catch(err) {
                    console.log(err);
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        })
    })
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;