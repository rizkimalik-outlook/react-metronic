import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store from "./app/store";
import SplashScreen from 'views/components/SplashScreen';

let persistor = persistStore(store);

//BrowserRouter to HashRouter --build
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={<SplashScreen />} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

