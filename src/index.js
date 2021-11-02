import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


import App from './App';
// import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

//BrowserRouter to HashRouter --prod
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

// reportWebVitals();
