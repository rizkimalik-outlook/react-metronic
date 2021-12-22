import React, { Suspense, lazy } from 'react'
import { Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authUser } from 'app/slice/sliceAuth'

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'; //Auth Route
import ProtectedRoutes from './ProtectedRoutes';
import SplashScreen from 'views/components/SplashScreen';

const Login = lazy(() => import('../views/pages/Login'));

function Router() {
    const getAuthUser = useSelector(authUser);
    const isAuth = Boolean(getAuthUser.token);
    // console.log(isAuth);

    return (
        <Suspense fallback={<SplashScreen />}>
            <Switch>
                <PublicRoute path='/login' isAuth={isAuth}>
                    <Login />
                </PublicRoute>

                <PrivateRoute path="/" isAuth={isAuth}>
                    <ProtectedRoutes />
                </PrivateRoute>
            </Switch>
        </Suspense>
    )

}

export default Router
