import { lazy } from 'react';

const routes = [
    {
        path: 'dash_ticket', 
        exact: true, 
        component: lazy(() => import('../pages/Dashboard')),
    },{
        path: 'general', 
        exact: true, 
        component: lazy(() => import('../pages/General')),
    },{
        path: 'user', 
        exact: true, 
        component: lazy(() => import('../pages/user/UserList')),
    },{
        path: 'user/create', 
        exact: false, 
        component: lazy(() => import('../pages/user/UserCreate')),
    },{
        path: 'user/show/:username', 
        exact: false, 
        component: lazy(() => import('../pages/user/UserView')),
    },{
        path: 'user/:username/edit', 
        exact: false, 
        component: lazy(() => import('../pages/user/UserEdit')),
    },
    
    //? custom route
    {
        path: '/',
        component: lazy(() => import('../pages/General')),
        exact: true,
    },{
        path: 'dxreact', 
        exact: true, 
        component: lazy(() => import('../pages/DxReact')),
    },{
        path: 'chat', 
        exact: true, 
        component: lazy(() => import('../pages/SocketClient')),
    },

    /* {
        path: '*',
        component: lazy(() => import('../pages/NotFound')),
        exact: true,
    }, */
];

export default routes;