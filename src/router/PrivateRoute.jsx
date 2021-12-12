import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from 'layouts/Auth'
import Aside from 'layouts/partials/Aside';

function PrivateRoute({ children, path, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            path={path}
            render={
                ({ location }) => (
                    isAuth
                        ? (
                            <div>
                                <Aside />
                                <Auth>
                                    {children}
                                </Auth>
                            </div>
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

export default PrivateRoute;