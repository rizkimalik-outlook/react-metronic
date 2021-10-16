import React from 'react'
import { NavLink } from 'react-router-dom'

function MenuItem(props) {
    const { children, to, active, isRoot } = props;

    return (
        <>
            {
                isRoot === false
                    ? <li
                        className={
                            active === to
                                ? "menu-item menu-item-active"
                                : "menu-item"
                        }
                        aria-haspopup={true}
                    >
                        <NavLink exact to={to} className="menu-link inline-flex">
                            {children}
                        </NavLink>
                    </li>

                    : <li className="menu-item menu-item-submenu" aria-haspopup={true} data-menu-toggle="hover">
                        <button className="btn btn-link menu-link inline-flex menu-toggle">
                            {children}
                        </button>

                        <div className="menu-submenu">
                            <i className="menu-arrow" />
                            <ul className="menu-subnav">
                                <li className="menu-item menu-item-parent" aria-haspopup={true}>
                                    <span className="menu-link">
                                        <span className="menu-text">Themes</span>
                                    </span>
                                </li>
                                <li className="menu-item" aria-haspopup={true}>
                                    <NavLink to="/metronic/demo1/layout/themes/aside-light.html" className="menu-link">
                                        <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                        </i>
                                        <span className="menu-text">Light Aside</span>
                                    </NavLink>
                                </li>
                                <li className="menu-item" aria-haspopup={true}>
                                    <NavLink to="/metronic/demo1/layout/themes/header-dark.html" className="menu-link">
                                        <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                        </i>
                                        <span className="menu-text">Dark Header</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
            }
        </>
    )
}

export default MenuItem
