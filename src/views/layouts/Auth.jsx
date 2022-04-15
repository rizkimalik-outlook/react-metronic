import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { axiosDefault } from 'app/config';
import Aside from './partials/Aside';
import Footer from './partials/Footer';
import Header from './partials/Header';
import SocketIO from 'views/components/SocketIO';
import { AskPermission } from 'views/components/Notification';
import { authUser } from 'app/slice/sliceAuth';
import { getMainMenu } from 'app/services/apiMenu'

function Auth({ children }) {
    const auth = useSelector(authUser);
    const dispatch = useDispatch();
    const { main_menu } = useSelector(state => state.mainmenu);

    useEffect(() => {
        AskPermission();
        axiosDefault(auth.token);
        dispatch(getMainMenu({ user_level: auth.user_level }))
    }, [dispatch, auth]);

    return (
        <div className="d-flex flex-row flex-column-fluid page">
            <SocketIO />
            <Aside main_menu={main_menu} />

            <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <Header />
                {children}
                <Footer />
            </div>

            {/* tooltip icon */}
            <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
                <li className="nav-item mb-2" data-toggle="tooltip" data-placement="left" data-original-title="Aux Login">
                    <button className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
                        <i className="fa fa-user-cog" />
                    </button>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="left" data-original-title="Todolist">
                    <NavLink to="/todolist" className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
                        <i className="fa fa-clipboard-list" />
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Auth
