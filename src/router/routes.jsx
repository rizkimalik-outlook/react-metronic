import { lazy } from 'react';

const routes = [
    {
        path: 'dash_ticket', 
        exact: true, 
        component: lazy(() => import('pages/dashboard/DashboardTicket')),
    },{
        path: 'todolist', 
        exact: true, 
        component: lazy(() => import('pages/todolist/TodoList')),
    },{
        path: 'user', 
        exact: true, 
        component: lazy(() => import('pages/user/UserList')),
    },{
        path: 'user/create', 
        exact: false, 
        component: lazy(() => import('pages/user/UserCreate')),
    },{
        path: 'user/show/:id', 
        exact: false, 
        component: lazy(() => import('pages/user/UserView')),
    },{
        path: 'user/:id/edit', 
        exact: false, 
        component: lazy(() => import('pages/user/UserEdit')),
    },
    
    //? custom route
    {
        path: '/',
        component: lazy(() => import('pages/todolist/TodoList')),
        exact: true,
    },{
        path: 'general', 
        exact: true, 
        component: lazy(() => import('pages/General')),
    },/* {
        path: '*',
        component: lazy(() => import('../pages/NotFound')),
        exact: false,
    }, */{
        path: 'dxgrid', 
        exact: true, 
        component: lazy(() => import('pages/DxReact')),
    },{
        path: 'chat', 
        exact: true, 
        component: lazy(() => import('pages/SocketClient')),
    },
];

export default routes;