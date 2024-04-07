import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, data:[]},
    reducers: {
        setCredentials: (state, action) => {
            const {accessToken} = action.payload;
            state.token = accessToken;
            state.data = [];
        },
        logOut: (state,action) => {
            state.token = null;
            state.data = []
        },

        setData: (state, action) => {
            const data = action.payload;
            state.data = data;
            state.token = state.token;
        },
    }
        
})

export const {setCredentials, logOut, setData} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectData = (state) => state.auth.data;