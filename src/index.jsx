import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';

//BrowserRouter to HashRouter --build
ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter> 
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);

