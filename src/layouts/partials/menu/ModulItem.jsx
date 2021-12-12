import React from 'react'
import { NavLink } from 'react-router-dom'
import SubModulItem from './SubModulItem'

function ModulItem(props) {
    const { data, active } = props;

    return (
        <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
                {
                    data.map((item, index) => {
                        return (
                            Boolean(item.is_root) === false
                                ? <li
                                    className={
                                        // location.pathname === item.path
                                        active === item.path
                                            ? "menu-item menu-item-active"
                                            : "menu-item"
                                    }
                                    key={index}
                                >
                                    <NavLink to={item.path} className="menu-link inline-flex">
                                        <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                        </i>
                                        <span className="menu-text">{item.menu_modul_name}</span>
                                    </NavLink>
                                </li>

                                : <li className="menu-item menu-item-submenu" data-menu-toggle="hover" key={index}>
                                    <button className="btn btn-link menu-link inline-flex menu-toggle">
                                        <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                        </i>
                                        <span className="menu-text">{item.menu_modul_name}</span>
                                        <i className="menu-arrow" />
                                    </button>
                                    <SubModulItem />
                                </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default ModulItem
