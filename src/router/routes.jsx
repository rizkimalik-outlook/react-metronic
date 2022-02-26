import { lazy } from 'react';

const routes = [
    {
        path: 'dash/ticket', 
        exact: true, 
        component: lazy(() => import('views/pages/dashboard/DashboardTicket')),
    },

    //? master data
    {
        path: 'category', 
        exact: true, 
        component: lazy(() => import('views/pages/master/category/CategoryList')),
    },{
        path: 'category/create', 
        exact: false, 
        component: lazy(() => import('views/pages/master/category/CategoryCreate')),
    },{
        path: 'category/:category_id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/master/category/CategoryEdit')),
    },{
        path: 'categorysublv1', 
        exact: true, 
        component: lazy(() => import('views/pages/master/categorysub1/CategorySubLv1')),
    },{
        path: 'categorysublv1/create', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub1/CategorySubLv1Create')),
    },{
        path: 'categorysublv1/:category_sublv1_id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub1/CategorySubLv1Edit')),
    },{
        path: 'categorysublv2', 
        exact: true, 
        component: lazy(() => import('views/pages/master/categorysub2/CategorySubLv2')),
    },{
        path: 'categorysublv2/create', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub2/CategorySubLv2Create')),
    },{
        path: 'categorysublv2/:category_sublv2_id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub2/CategorySubLv2Edit')),
    },{
        path: 'categorysublv3', 
        exact: true, 
        component: lazy(() => import('views/pages/master/categorysub3/CategorySubLv3')),
    },{
        path: 'categorysublv3/create', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub3/CategorySubLv3Create')),
    },{
        path: 'categorysublv3/:category_sublv3_id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/master/categorysub3/CategorySubLv3Edit')),
    },
    
    //? todolist
    {
        path: 'todolist', 
        exact: true, 
        component: lazy(() => import('views/pages/todolist/TodoList')),
    },
    
    //? ticket
    {
        path: 'ticket', 
        exact: true, 
        component: lazy(() => import('views/pages/ticket/TicketMain')),
    },{
        path: 'ticket/history', 
        exact: true, 
        component: lazy(() => import('views/pages/ticket/TicketHistory')),
    },
    
    //? channels
    {
        path: 'channel/socmed', 
        exact: true, 
        component: lazy(() => import('views/pages/channel/socmed/SocialMedia')),
    },
    
    //? customers
    {
        path: 'customer', 
        exact: true, 
        component: lazy(() => import('views/pages/customer/CustomerList')),
    },{
        path: 'customer/create', 
        exact: false, 
        component: lazy(() => import('views/pages/customer/CustomerCreate')),
    },{
        path: 'customer/:customer_id/edit', 
        exact: false, 
        component: lazy(() => import('views/pages/customer/CustomerEdit')),
    },
    
    //? setting users, privillage
    {
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
        path: 'user/privillage', 
        exact: true, 
        component: lazy(() => import('views/pages/settings/privillage/UserPrivillage')),
    },
    
    //? custom route
    {
        path: '/',
        component: lazy(() => import('views/pages/Home')),
        exact: true,
    },{
        path: 'general', 
        exact: true, 
        component: lazy(() => import('views/pages/General')),
    },/* {
        path: '*',
        component: lazy(() => import('../pages/NotFound')),
        exact: false,
    },
    {
        path: 'dxgrid', 
        exact: true, 
        component: lazy(() => import('views/pages/DxReact')),
    },{
        path: 'chat', 
        exact: true, 
        component: lazy(() => import('views/pages/SocketClient')),
    }, */
];

export default routes;