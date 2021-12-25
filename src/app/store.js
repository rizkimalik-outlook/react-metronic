import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import rootReducer from 'app/rootReducer';

export default configureStore({
    reducer: rootReducer,
    // middleware: [thunk]
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(user.middleware)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})