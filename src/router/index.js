import React from 'react'
import { Route, Switch, Redirect  } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AuthUser } from 'store'

import Auth from 'layouts/Auth'
import Guest from 'layouts/Guest'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import General from '../pages/General'
import Aside from 'layouts/partials/Aside'



function Router() {
    const getAuthUser = useRecoilValue(AuthUser);
    // console.log(getAuthUser);

    if(!getAuthUser.token){
        return (
            <Switch>
                <Route exact path='/'>
                    <Guest children={<Login />} />
                </Route>
                <Route path='/login'>
                    <Guest children={<Login />} />
                </Route>
                <Route exact path="*" render={() => <Redirect to="/login" />} />
            </Switch>
        )
    }
    else {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                <Route path="/login" render={() => <Redirect to="/dashboard" />} />
                <Route path='/general'>
                    <Aside />
                    <Auth children={<General />} />
                </Route>
                <Route path='/dashboard'>
                    <Aside />
                    <Auth children={<Dashboard />} />
                </Route>
            </Switch>
        )
    }

    
}

export default Router
