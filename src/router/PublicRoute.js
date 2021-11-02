import { Route, Redirect } from "react-router-dom";
import Guest from 'layouts/Guest';


function PublicRoute({ children, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !isAuth ? (
                        <Guest>
                            {children}
                        </Guest>
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/dashboard',
                                state: { from: location }
                            }}
                        />
                    ))
            }
        />
    );
}

export default PublicRoute;