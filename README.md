# [Mendawai App](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

# Getting Started with Mendawai App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Edit file 
`src/index.jsx` :
```
local:
    <BrowserRouter> 
        <App />
    </BrowserRouter>

server:
    <HashRouter> 
        <App />
    </HashRouter>
```
add basename app-name: 
```
<BrowserRouter basename="/app-mendawai"/>
```

`.env` :
```json
local:
REACT_APP_REST_API = "http://localhost:3001"

server:
REACT_APP_REST_API = "https://selindo.mendawai.com/api-mendawai/",
```


`package.json` :
```json
local:
"homepage": ".",
"proxy": "http://localhost:3001",

server:
"homepage": "https://selindo.mendawai.com/app-mendawai/",
"proxy": "https://selindo.mendawai.com/api-mendawai/",
```


To learn React, check out the [React documentation](https://reactjs.org/).
