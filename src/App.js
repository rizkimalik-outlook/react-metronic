import { useEffect,Suspense } from "react";
import Router from "./router";
import SplashScreen from 'components/SplashScreen';

// import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { AskPermission } from "components/Notification";

function App() {
    useEffect(() => {
        AskPermission();
    }, []);
    
    return (
        <Suspense fallback={<SplashScreen />}>
            <Router />
        </Suspense>
    );
}

export default App;
