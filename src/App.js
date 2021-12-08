import { useEffect,Suspense } from "react";
import Router from "./router";
import SplashScreen from 'components/SplashScreen';
import { AskPermission } from "components/Notification";
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { AuthUser } from 'store';

// import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

axios.defaults.baseURL = process.env.REACT_APP_REST_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;

function App() {
    const {token} = useRecoilValue(AuthUser);

    useEffect(() => {
        AskPermission();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [token]);
    
    return (
        <Suspense fallback={<SplashScreen />}>
            <Router />
        </Suspense>
    );
}

export default App;
