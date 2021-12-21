import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import authSlice from './slice/authSlice';
import sosmedSlice from './slice/sosmedSlice';
import { auth } from './services/apiAuth';
import { user } from './services/apiUser';
import { user_level } from './services/apiUserLevel';

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
        sosialmedia: sosmedSlice,
        [auth.reducerPath]: auth.reducer,
        [user.reducerPath]: user.reducer,
        [user_level.reducerPath]: user_level.reducer,
    },
    // middleware: [thunk]
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(user.middleware)
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})