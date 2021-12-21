import React, { useEffect } from 'react';
// import Aside from './partials/Aside';
import Footer from './partials/Footer';
import Header from './partials/Header';
import { axiosDefault } from 'app/config';
import { AskPermission } from 'views/components/Notification';
import { authUser } from 'app/slice/authSlice';
import { useSelector } from 'react-redux';
import SocketIO from 'views/components/SocketIO';

function Auth({ children }) {
    const { token } = useSelector(authUser);
    useEffect(() => {
        AskPermission();
        axiosDefault(token);
        SocketIO();
    }, [token]);

    return (
        <div className="d-flex flex-row flex-column-fluid page">
            {/* <Aside /> */}
            <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Auth
