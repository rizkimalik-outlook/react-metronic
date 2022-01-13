import React, { useEffect } from 'react';
// import Aside from './partials/Aside';
import Footer from './partials/Footer';
import Header from './partials/Header';
import { axiosDefault } from 'app/config';
import { AskPermission } from 'views/components/Notification';
import { authUser } from 'app/slice/sliceAuth';
import { useSelector } from 'react-redux';
import SocketIO from 'views/components/SocketIO';

function Auth({ children }) {
    const { token } = useSelector(authUser);
    useEffect(() => {
        AskPermission();
        axiosDefault(token);
    }, [token]);

    return (
        <div className="d-flex flex-row flex-column-fluid page">
            <SocketIO />
            {/* <Aside /> */}
            <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <Header />
                {children}
                <Footer />
            </div>

            {/* tooltip icon */}
            <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
                <li className="nav-item mb-2" data-toggle="tooltip" title data-placement="left" data-original-title="Aux Login">
                    <button className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
                        <i className="fa fa-user-cog" />
                    </button>
                </li>
                <li className="nav-item" data-toggle="tooltip" title data-placement="left" data-original-title="Todolist">
                    <button className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
                        <i className="fa fa-clipboard-list" />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Auth
