import React, { Suspense, lazy } from 'react'
import { Switch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AuthUser } from 'store'

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'; //Auth Route
import ProtectedRoutes from './ProtectedRoutes';
import SplashScreen from 'components/SplashScreen';

const Login = lazy(() => import('../pages/Login'));

function Router() {
    const getAuthUser = useRecoilValue(AuthUser);
    const isAuth = getAuthUser.token;
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
