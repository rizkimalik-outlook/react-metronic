import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


import App from './App';
// import reportWebVitals from './reportWebVitals';


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
