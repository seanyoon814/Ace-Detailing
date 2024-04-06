import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import {apiSlice} from './features/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
export const store = configureStore({
     reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
      },
      devtools: true,
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch);