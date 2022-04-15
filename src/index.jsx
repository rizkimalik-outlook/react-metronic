import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store from "./app/store";

let persistor = persistStore(store);

//BrowserRouter to HashRouter --build
// basename={'/app-mendawai'}
ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

