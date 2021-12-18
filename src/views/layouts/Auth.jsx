import React, { useEffect } from 'react';
// import Aside from './partials/Aside';
import Footer from './partials/Footer';
import Header from './partials/Header';
import { socket } from 'app/config';
import { AskPermission, ShowNotification } from 'views/components/Notification';

function Auth({ children }) {

    useEffect(() => {
        AskPermission();
        console.log(`connected: ${socket.connected}, id: ${socket.id}`);
        socket.on('return-message-customer', (res) => {
            let { message, name } = res;
            ShowNotification(name, message);
        });
    }, []);

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
