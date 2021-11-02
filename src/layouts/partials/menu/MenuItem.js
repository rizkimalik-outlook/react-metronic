import Icons from 'components/Icons';
import React from 'react'
import { NavLink } from 'react-router-dom'
import ModulItem from './ModulItem';

function MenuItem(props) {
    const { item, active } = props;
    // console.log(item);
    return (
        <>
            {
                Boolean(item.is_root) === false
                    ? <li
                        className={
                            active === item.path
                                ? "menu-item menu-item-active"
                                : "menu-item"
                        }
                    >
                        <NavLink exact to={item.path} className="menu-link inline-flex">
                            <Icons iconName="layout-4-block" className="svg-icon menu-icon" />
                            <span className="menu-text ml-2">{item.menu_name}</span>
                        </NavLink>
                    </li>

                    : <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                        <button  className="btn btn-link menu-link inline-flex menu-toggle">
                            <Icons iconName="layout-4-block" className="svg-icon menu-icon" />
                            <span className="menu-text">{item.menu_name}</span>
                            <i className="menu-arrow" />
                        </button>
                        
                        {
                            item.menu_modul.length > 0 ? <ModulItem data={item.menu_modul} key={item.menu_id} /> : ''
                        }
                    </li>
            }
        </>
    )
}

export default MenuItem
