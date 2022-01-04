import { lazy } from 'react';

const routes = [
    {
        path: 'dash_ticket', 
        exact: true, 
        component: lazy(() => import('views/pages/dashboard/DashboardTicket')),
    },{
        path: 'todolist', 
        exact: true, 
        component: lazy(() => import('views/pages/todolist/TodoList')),
    },{
        path: 'channel_socmed', 
        exact: true, 
        component: lazy(() => import('views/pages/channel/socmed/SocialMedia')),
    },{
        path: 'customer', 
        exact: true, 
        component: lazy(() => import('views/pages/customer/CustomerList')),
    },{
        path: 'user', 
        exact: true, 
        component: lazy(() => import('views/pages/user/UserList')),
    },{
        path: 'user/create', 
        exact: false, 
        component: lazy(() => import('views/pages/user/UserCreate')),
    },{
        path: 'user/show/:id', 
        exact: false, 
        component: lazy(() => import('views/pages/user/UserDetail')),
    },{
        path: 'user/:id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/user/UserEdit')),
    },{
        path: 'user_privillage', 
        exact: true, 
        component: lazy(() => import('views/pages/settings/privillage/UserPrivillage')),
    },
    
    //? custom route
    {
        path: '/',
        component: lazy(() => import('views/pages/todolist/TodoList')),
        exact: true,
    },{
        path: 'general', 
        exact: true, 
        component: lazy(() => import('views/pages/General')),
    },/* {
        path: '*',
        component: lazy(() => import('../pages/NotFound')),
        exact: false,
    }, */
    {
        path: 'dxgrid', 
        exact: true, 
        component: lazy(() => import('views/pages/DxReact')),
    },{
        path: 'chat', 
        exact: true, 
        component: lazy(() => import('views/pages/SocketClient')),
    },
];

export default routes;