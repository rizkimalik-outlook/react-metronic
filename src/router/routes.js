import { lazy } from 'react';

const routes = [
    {
        path: 'dxreact', exact: true, component: lazy(() => import('../pages/DxReact')),
    },{
        path: 'chat', exact: true, component: lazy(() => import('../pages/SocketClient')),
    },{
        path: 'dashboard', exact: true, component: lazy(() => import('../pages/Dashboard')),
    },{
        path: 'general', exact: true, component: lazy(() => import('../pages/General')),
    },{
        path: 'users', exact: true, component: lazy(() => import('../pages/user/ListUser')),
    },{
        path: 'user/create', exact: false, component: lazy(() => import('../pages/user/UserCreate')),
    },{
        path: 'user/show/:username', exact: false, component: lazy(() => import('../pages/user/ViewUser')),
    },{
        path: 'user/:username/edit', exact: false, component: lazy(() => import('../pages/user/UserEdit')),
    },{
        path: '/',
        component: lazy(() => import('../pages/General')),
        exact: true,
    },
    // {
    //     path: '*',
    //     component: lazy(() => import('../pages/NotFound')),
    //     exact: true,
    // },
];

export default routes;