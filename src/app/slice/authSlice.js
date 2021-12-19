import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    name: '',
    username: '',
    token: '',
    user_level: '',
    email_address: '',
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.user_level = action.payload.user_level;
            state.email_address = action.payload.email_address;
        }
    },
})

// dvalue from store in the slice file. For example: `useSelector((state) => state.counter.value)`
export const authUser = state => state.persistedReducer.authUser;

//export actions
export const { setAuth } = authSlice.actions;

//export reducer
export default authSlice;