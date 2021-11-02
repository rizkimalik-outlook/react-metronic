import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes'; // Route list
import SplashScreen from 'components/SplashScreen';

const ProtectedRoutes = () => (
    <Switch>
        <Suspense fallback={<SplashScreen />}>
            {
                routes.map(({ component: Component, path, exact }) => (
                    <Route
                        path={`/${path}`}
                        key={path}
                        exact={exact}
                        component={Component}
                    />
                ))
            }
        </Suspense>
    </Switch>
);

export default ProtectedRoutes;