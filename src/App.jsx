import { useEffect, Fragment } from "react";
import Router from "./router";
import { AskPermission } from "views/components/Notification";
// import SplashScreen from 'views/components/SplashScreen';

// import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

function App() {
    useEffect(() => {
        AskPermission();
    }, []);
    
    return (
        <Fragment>
            <Router />
        </Fragment>
    );
}

export default App;
