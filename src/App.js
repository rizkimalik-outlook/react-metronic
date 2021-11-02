import { Suspense } from "react";
import Router from "./router";
import SplashScreen from 'components/SplashScreen';

// import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';


function App() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <Router />
        </Suspense>
    );
}

export default App;
