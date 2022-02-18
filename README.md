# [Mendawai App](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

# Getting Started with Mendawai App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
## Add your files

- [ ] [Create](https://gitlab.com/-/experiment/new_project_readme_content:b07abec9933d730b136679c873a8b1fb?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://gitlab.com/-/experiment/new_project_readme_content:b07abec9933d730b136679c873a8b1fb?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://gitlab.com/-/experiment/new_project_readme_content:b07abec9933d730b136679c873a8b1fb?https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/rizkimalik/app-mendawai.git
git branch -M main
git push -uf origin main
```


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
REACT_APP_REST_API = "https://selindo.mendawai.com/api-mendawai",
```


`package.json` :
```json
local:
"homepage": ".",
"proxy": "http://localhost:3001",

server:
"homepage": "https://selindo.mendawai.com/app-mendawai",
"proxy": "https://selindo.mendawai.com/api-mendawai",
```


To learn React, check out the [React documentation](https://reactjs.org/).
