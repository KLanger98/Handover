import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authActions';

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
        } ).addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }) 
    },
});

export default authSlice.reducer;