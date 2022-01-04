import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import sliceAuth from './slice/sliceAuth';
import sliceSosmed from './slice/sliceSosmed';
import sliceMenu from './slice/sliceMenu';
import sliceCustomer from './slice/sliceCustomer';
import { auth } from './services/apiAuth';
import { user } from './services/apiUser';
import { user_level } from './services/apiUserLevel';
import { menu_access } from './services/apiMenu';

const persistConfig = {
    key: 'auth',
    version: 1,
    storage
};

const reducer = combineReducers({
    authUser: sliceAuth.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const rootReducer = {
    persistedReducer,
    mainmenu: sliceMenu.reducer,
    sosialmedia: sliceSosmed.reducer,
    customer: sliceCustomer.reducer,
    auth: auth.reducer,
    user: user.reducer,
    user_level: user_level.reducer,
    menu_access: menu_access.reducer,
}

export default rootReducer;
