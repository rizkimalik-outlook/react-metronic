import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import auth from './services/apiAuth';
import user from './services/apiUser';
import menu_access from './services/apiMenu';
import sliceAuth from './slice/sliceAuth';
import sliceSosmed from './slice/sliceSosmed';
import sliceMenu from './slice/sliceMenu';
import sliceCustomer from './slice/sliceCustomer';
import sliceTicket from './slice/sliceTicket';
import sliceMasterData from './slice/sliceMasterData';
import sliceCategory from './slice/sliceCategory';
import sliceOrganization from './slice/sliceOrganization';

const persistConfig = {
    key: 'auth',
    version: 1,
    storage
}

const reducer = combineReducers({
    authUser: sliceAuth.reducer
})
const persistedReducer = persistReducer(persistConfig, reducer);

const rootReducer = {
    persistedReducer,
    mainmenu: sliceMenu.reducer,
    menu_access: menu_access.reducer,
    sosialmedia: sliceSosmed.reducer,
    auth: auth.reducer,
    user: user.reducer,
    customer: sliceCustomer.reducer,
    ticket: sliceTicket.reducer,
    master: sliceMasterData.reducer,
    category: sliceCategory.reducer,
    organization: sliceOrganization.reducer,
}

export default rootReducer;
