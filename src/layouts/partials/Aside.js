import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MenuItem from './menu/MenuItem'
import axios from 'axios';
import Icons from 'components/Icons';

function Aside() {
    const location = useLocation();
    const [menu, setMenu] = useState([]);

    async function getMenus() {
        try {
            const res = await axios.get('/menu')
            const data = res.data;
            // console.log(data);
            setMenu(data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMenus()
    }, [])

    return (
        <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto shadow-none border" id="kt_aside">
            <div className="brand flex-column-auto" id="kt_brand">
                <NavLink to="/general" className="brand-logo">
                    <img alt="Logo" src="/assets/media/logos/logo-hitam-50.png" height={40} />
                </NavLink>
                <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                    <Icons iconName="angle-double-left" className="svg-icon svg-icon svg-icon-xl" />
                </button>
            </div>

            <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                <div id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical={1} data-menu-scroll={1} data-menu-dropdown-timeout={500}>
                    <ul className="menu-nav">
                        {
                            menu.map((item, index) => {
                                return (
                                    // <MenuItem to={item.menu_id} active={item.menu_name} isRoot={false} key={index}>
                                    <MenuItem 
                                        item={item} 
                                        active={location.pathname} 
                                        key={index}
                                    >
                                    </MenuItem>
                                )
                            })
                        }

                        


                        {/* //?sample menu root */}
                        {/* <li className="menu-section">
                            <h4 className="menu-text">Custom</h4>
                            <i className="menu-icon ki ki-bold-more-hor icon-md" />
                        </li> */}
                        {/* <MenuItem to="/theme" active={location.pathname} isRoot={true}>
                            <span className="svg-icon menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" fill="none" >
                                        <rect x={0} y={0} width={24} height={24} />
                                        <path d="M5,5 L5,15 C5,15.5948613 5.25970314,16.1290656 5.6719139,16.4954176 C5.71978107,16.5379595 5.76682388,16.5788906 5.81365532,16.6178662 C5.82524933,16.6294602 15,7.45470952 15,7.45470952 C15,6.9962515 15,6.17801499 15,5 L5,5 Z M5,3 L15,3 C16.1045695,3 17,3.8954305 17,5 L17,15 C17,17.209139 15.209139,19 13,19 L7,19 C4.790861,19 3,17.209139 3,15 L3,5 C3,3.8954305 3.8954305,3 5,3 Z" fill="#000000" fillRule="nonzero" transform="translate(10.000000, 11.000000) rotate(-315.000000) translate(-10.000000, -11.000000)" />
                                        <path d="M20,22 C21.6568542,22 23,20.6568542 23,19 C23,17.8954305 22,16.2287638 20,14 C18,16.2287638 17,17.8954305 17,19 C17,20.6568542 18.3431458,22 20,22 Z" fill="#000000" opacity="0.3" />
                                    </g>
                                </svg>
                            </span>
                            <span className="menu-text">Theme 2</span>
                            <i className="menu-arrow" />
                        </MenuItem> */}

                        {/* <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                            <NavLink to="/dashboard" className="menu-link menu-toggle">
                                <span className="svg-icon menu-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" fill="none" >
                                            <rect x={0} y={0} width={24} height={24} />
                                            <path d="M13,17.0484323 L13,18 L14,18 C15.1045695,18 16,18.8954305 16,20 L8,20 C8,18.8954305 8.8954305,18 10,18 L11,18 L11,17.0482312 C6.89844817,16.5925472 3.58685702,13.3691811 3.07555009,9.22038742 C3.00799634,8.67224972 3.3975866,8.17313318 3.94572429,8.10557943 C4.49386199,8.03802567 4.99297853,8.42761593 5.06053229,8.97575363 C5.4896663,12.4577884 8.46049164,15.1035129 12.0008191,15.1035129 C15.577644,15.1035129 18.5681939,12.4043008 18.9524872,8.87772126 C19.0123158,8.32868667 19.505897,7.93210686 20.0549316,7.99193546 C20.6039661,8.05176407 21.000546,8.54534521 20.9407173,9.09437981 C20.4824216,13.3000638 17.1471597,16.5885839 13,17.0484323 Z" fill="#000000" fillRule="nonzero" />
                                            <path d="M12,14 C8.6862915,14 6,11.3137085 6,8 C6,4.6862915 8.6862915,2 12,2 C15.3137085,2 18,4.6862915 18,8 C18,11.3137085 15.3137085,14 12,14 Z M8.81595773,7.80077353 C8.79067542,7.43921955 8.47708263,7.16661749 8.11552864,7.19189981 C7.75397465,7.21718213 7.4813726,7.53077492 7.50665492,7.89232891 C7.62279197,9.55316612 8.39667037,10.8635466 9.79502238,11.7671393 C10.099435,11.9638458 10.5056723,11.8765328 10.7023788,11.5721203 C10.8990854,11.2677077 10.8117724,10.8614704 10.5073598,10.6647638 C9.4559885,9.98538454 8.90327706,9.04949813 8.81595773,7.80077353 Z" fill="#000000" opacity="0.3" />
                                        </g>
                                    </svg>
                                </span>
                                <span className="menu-text">Miscellaneous</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className="menu-submenu">
                                <i className="menu-arrow" />
                                <ul className="menu-subnav">
                                    <li className="menu-item menu-item-parent">
                                        <span className="menu-link">
                                            <span className="menu-text">Miscellaneous</span>
                                        </span>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/metronic/demo1/features/miscellaneous/kanban-board.html" className="menu-link">
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">Kanban Board</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/metronic/demo1/features/miscellaneous/sticky-panels.html" className="menu-link">
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">Sticky Panels</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/metronic/demo1/features/miscellaneous/blockui.html" className="menu-link">
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">Block UI</span>
                                        </NavLink>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/metronic/demo1/features/miscellaneous/perfect-scrollbar.html" className="menu-link">
                                            <i className="menu-bullet menu-bullet-dot">
                                                <span />
                                            </i>
                                            <span className="menu-text">Perfect Scrollbar</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
 */}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside
