import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import thunk from 'redux-thunk';

import authSlice from './slice/authSlice';
import { auth } from './services/auth';
import { menu } from './services/menu';
import { user } from './services/user';

const reducers = combineReducers({ 
    authUser: authSlice.reducer 
});

const persistConfig = {
    key: 'auth',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: {
        persistedReducer,
        [auth.reducerPath]: auth.reducer,
        [menu.reducerPath]: menu.reducer,
        [user.reducerPath]: user.reducer,
    },
    middleware: [thunk]
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(user.middleware)
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),

})