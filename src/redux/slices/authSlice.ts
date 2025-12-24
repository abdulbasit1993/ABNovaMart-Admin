import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;