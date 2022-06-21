import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { socket } from 'app/config';
import { authUser } from 'app/slice/sliceAuth';
import Icons from 'views/components/Icons';
import { useLogoutMutation } from 'app/services/apiAuth';

function Header() {
    const history = useHistory();
    const user = useSelector(authUser);
    const [logout] = useLogoutMutation();

    async function onSignOut() {
        try {
            const response = await logout({ username: user.username });
            if (response.data.status === 200) {
                socket.disconnect();
                localStorage.clear();
                history.push('/login');
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <header id="kt_header" className="header header-fixed">
            <div className="container-fluid d-flex align-items-stretch justify-content-between">
                <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                    <div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
                        <ul className="menu-nav">
                            {/* <li className="menu-item menu-item-submenu" data-menu-toggle="click">
                                <Link to="/dashboard" className="menu-link menu-toggle">
                                    <span className="menu-text">Features</span>
                                    <i className="menu-arrow" />
                                </Link>
                            </li>
                            <li className="menu-item menu-item-submenu menu-item-rel" data-menu-toggle="click">
                                <Link to="/chat" className="menu-link menu-toggle">
                                    <span className="menu-text">Apps</span>
                                    <i className="menu-arrow" />
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>


                <div className="topbar">
                    <div className="dropdown">
                        <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                            <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                                <Icons iconName="layout-4-block" className="svg-icon svg-icon-xl svg-icon-primary" />
                            </div>
                        </div>
                        <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                            <div className="d-flex flex-column flex-center py-10 bg-primary bgi-size-cover bgi-no-repeat rounded-top">
                                <h4 className="text-white font-weight-bold">Quick Actions</h4>
                                <span className="btn btn-success btn-sm font-weight-bold font-size-sm mt-2">Task Channel</span>
                            </div>
                            <div className="row row-paddingless">
                                <div className="col-6">
                                    <Link to="/empty" className="d-block py-10 px-5 text-center bg-hover-light border-right border-bottom">
                                        <span className="svg-icon svg-icon-3x svg-icon-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" fill="none">
                                                    <rect x={0} y={0} width={24} height={24} />
                                                    <path d="M4.3618034,10.2763932 L4.8618034,9.2763932 C4.94649941,9.10700119 5.11963097,9 5.30901699,9 L15.190983,9 C15.4671254,9 15.690983,9.22385763 15.690983,9.5 C15.690983,9.57762255 15.6729105,9.65417908 15.6381966,9.7236068 L15.1381966,10.7236068 C15.0535006,10.8929988 14.880369,11 14.690983,11 L4.80901699,11 C4.53287462,11 4.30901699,10.7761424 4.30901699,10.5 C4.30901699,10.4223775 4.32708954,10.3458209 4.3618034,10.2763932 Z M14.6381966,13.7236068 L14.1381966,14.7236068 C14.0535006,14.8929988 13.880369,15 13.690983,15 L4.80901699,15 C4.53287462,15 4.30901699,14.7761424 4.30901699,14.5 C4.30901699,14.4223775 4.32708954,14.3458209 4.3618034,14.2763932 L4.8618034,13.2763932 C4.94649941,13.1070012 5.11963097,13 5.30901699,13 L14.190983,13 C14.4671254,13 14.690983,13.2238576 14.690983,13.5 C14.690983,13.5776225 14.6729105,13.6541791 14.6381966,13.7236068 Z" fill="#000000" opacity="0.3" />
                                                    <path d="M17.369,7.618 C16.976998,7.08599734 16.4660031,6.69750122 15.836,6.4525 C15.2059968,6.20749878 14.590003,6.085 13.988,6.085 C13.2179962,6.085 12.5180032,6.2249986 11.888,6.505 C11.2579969,6.7850014 10.7155023,7.16999755 10.2605,7.66 C9.80549773,8.15000245 9.45550123,8.72399671 9.2105,9.382 C8.96549878,10.0400033 8.843,10.7539961 8.843,11.524 C8.843,12.3360041 8.96199881,13.0779966 9.2,13.75 C9.43800119,14.4220034 9.7774978,14.9994976 10.2185,15.4825 C10.6595022,15.9655024 11.1879969,16.3399987 11.804,16.606 C12.4200031,16.8720013 13.1129962,17.005 13.883,17.005 C14.681004,17.005 15.3879969,16.8475016 16.004,16.5325 C16.6200031,16.2174984 17.1169981,15.8010026 17.495,15.283 L19.616,16.774 C18.9579967,17.6000041 18.1530048,18.2404977 17.201,18.6955 C16.2489952,19.1505023 15.1360064,19.378 13.862,19.378 C12.6999942,19.378 11.6325049,19.1855019 10.6595,18.8005 C9.68649514,18.4154981 8.8500035,17.8765035 8.15,17.1835 C7.4499965,16.4904965 6.90400196,15.6645048 6.512,14.7055 C6.11999804,13.7464952 5.924,12.6860058 5.924,11.524 C5.924,10.333994 6.13049794,9.25950479 6.5435,8.3005 C6.95650207,7.34149521 7.5234964,6.52600336 8.2445,5.854 C8.96550361,5.18199664 9.8159951,4.66400182 10.796,4.3 C11.7760049,3.93599818 12.8399943,3.754 13.988,3.754 C14.4640024,3.754 14.9609974,3.79949954 15.479,3.8905 C15.9970026,3.98150045 16.4939976,4.12149906 16.97,4.3105 C17.4460024,4.49950095 17.8939979,4.7339986 18.314,5.014 C18.7340021,5.2940014 19.0909985,5.62999804 19.385,6.022 L17.369,7.618 Z" fill="#000000" />
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Email</span>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="/empty" className="d-block py-10 px-5 text-center bg-hover-light border-bottom">
                                        <span className="svg-icon svg-icon-3x svg-icon-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" fill="none">
                                                    <rect x={0} y={0} width={24} height={24} />
                                                    <path d="M14.8571499,13 C14.9499122,12.7223297 15,12.4263059 15,12.1190476 L15,6.88095238 C15,5.28984632 13.6568542,4 12,4 L11.7272727,4 C10.2210416,4 9,5.17258756 9,6.61904762 L10.0909091,6.61904762 C10.0909091,5.75117158 10.823534,5.04761905 11.7272727,5.04761905 L12,5.04761905 C13.0543618,5.04761905 13.9090909,5.86843034 13.9090909,6.88095238 L13.9090909,12.1190476 C13.9090909,12.4383379 13.8240964,12.7385644 13.6746497,13 L10.3253503,13 C10.1759036,12.7385644 10.0909091,12.4383379 10.0909091,12.1190476 L10.0909091,9.5 C10.0909091,9.06606198 10.4572216,8.71428571 10.9090909,8.71428571 C11.3609602,8.71428571 11.7272727,9.06606198 11.7272727,9.5 L11.7272727,11.3333333 L12.8181818,11.3333333 L12.8181818,9.5 C12.8181818,8.48747796 11.9634527,7.66666667 10.9090909,7.66666667 C9.85472911,7.66666667 9,8.48747796 9,9.5 L9,12.1190476 C9,12.4263059 9.0500878,12.7223297 9.14285008,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L14.8571499,13 Z" fill="#000000" opacity="0.3" />
                                                    <path d="M9,10.3333333 L9,12.1190476 C9,13.7101537 10.3431458,15 12,15 C13.6568542,15 15,13.7101537 15,12.1190476 L15,10.3333333 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 L9,10.3333333 Z M10.0909091,11.1212121 L12,12.5 L13.9090909,11.1212121 L13.9090909,12.1190476 C13.9090909,13.1315697 13.0543618,13.952381 12,13.952381 C10.9456382,13.952381 10.0909091,13.1315697 10.0909091,12.1190476 L10.0909091,11.1212121 Z" fill="#000000" />
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Chat</span>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="/empty" className="d-block py-10 px-5 text-center bg-hover-light border-right">
                                        <span className="svg-icon svg-icon-3x svg-icon-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" fill="none">
                                                    <rect x={0} y={0} width={24} height={24} />
                                                    <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z" fill="#000000" />
                                                    <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z" fill="#000000" opacity="0.3" />
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Voice Call</span>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="/empty" className="d-block py-10 px-5 text-center bg-hover-light">
                                        <span className="svg-icon svg-icon-3x svg-icon-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" fill="none">
                                                    <polygon points="0 0 24 0 24 24 0 24" />
                                                    <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                    <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Sosial Media</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                            <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                                <Icons iconName="group-chat" className="svg-icon svg-icon-xl svg-icon-primary" />
                                <span className="pulse-ring" />
                            </div>
                        </div>

                        <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                            <div className="d-flex flex-column flex-center py-5 bg-primary bgi-size-cover bgi-no-repeat rounded-top">
                                <span className="btn btn-success btn-sm font-weight-bold font-size-lg mt-2">15 Notifications</span>
                            </div>
                            <div className="row row-paddingless">
                                <div className="col-12" data-mobile-height={350} style={{ height: 300, overflow: 'auto' }}>
                                    <div className="navi navi-hover scroll my-4 ps" data-scroll="true">
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon2-fax text-success" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">New report has been received</div>
                                                    <div className="text-muted">23 hrs ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon-download-1 text-danger" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">Finance report has been generated</div>
                                                    <div className="text-muted">25 hrs ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon-security text-warning" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">New customer comment recieved</div>
                                                    <div className="text-muted">2 days ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon2-analytics-1 text-success" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">New customer is registered</div>
                                                    <div className="text-muted">3 days ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon-download-1 text-danger" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">Finance report has been generated</div>
                                                    <div className="text-muted">25 hrs ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon-security text-warning" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">New customer comment recieved</div>
                                                    <div className="text-muted">2 days ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <NavLink to="/empty" className="navi-item">
                                            <div className="navi-link">
                                                <div className="navi-icon mr-2">
                                                    <i className="flaticon2-analytics-1 text-success" />
                                                </div>
                                                <div className="navi-text">
                                                    <div className="font-weight-bold">New customer is registered</div>
                                                    <div className="text-muted">3 days ago</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* <div className="dropdown">
                        <div className="topbar-item" data-offset="10px,0px">
                            <NavLink to="/channel/socmed" className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                                <Icons iconName="group-chat" className="svg-icon svg-icon-xl svg-icon-primary" />
                                <span className="pulse-ring" />
                            </NavLink>
                        </div>
                    </div> */}

                    <div className="dropdown">
                        <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                            <div className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2">
                                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">{user.name}</span>
                                <span className="symbol symbol-lg-35 symbol-25 symbol-light-primary">
                                    <span className="symbol-label font-size-h5 font-weight-bold text-uppercase">{user.name.slice(0, 1)}</span>
                                </span>
                            </div>
                        </div>

                        <div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
                            <ul className="navi navi-hover py-4">
                                <li className="navi-item active">
                                    <Link to={`/user/${user.id}/edit`} className="navi-item">
                                        <div className="navi-link">
                                            <div className="symbol symbol-20 mr-3">
                                                <div className="symbol-label">
                                                    <Icons iconName="profile" className="svg-icon svg-icon-lg svg-icon-primary" />
                                                </div>
                                            </div>
                                            <div className="navi-text">
                                                <div className="font-weight-bold">My Profile</div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="navi-item active">
                                    <Link to="/todolist" className="navi-item">
                                        <div className="navi-link">
                                            <div className="symbol symbol-20 mr-3">
                                                <div className="symbol-label">
                                                    <Icons iconName="open" className="svg-icon svg-icon-lg svg-icon-primary" />
                                                </div>
                                            </div>
                                            <div className="navi-text">
                                                <div className="font-weight-bold">Todolist</div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="navi-item active">
                                    <Link to="/login" className="navi-item" onClick={onSignOut}>
                                        <div className="navi-link">
                                            <div className="symbol symbol-20 mr-3">
                                                <div className="symbol-label">
                                                    <Icons iconName="sign-out" className="svg-icon svg-icon-lg svg-icon-primary" />
                                                </div>
                                            </div>
                                            <div className="navi-text">
                                                <div className="font-weight-bold">Sign Out</div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
