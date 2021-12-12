import React from 'react'
import { NavLink } from 'react-router-dom'

function SubModulItem() {
    return (
        <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
                <li className="menu-item">
                    <NavLink to="/metronic/demo1/crud/forms/validation/states" className="menu-link">
                        <i className="menu-bullet menu-bullet-dot">
                            <span />
                        </i>
                        <span className="menu-text">Validation States</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/metronic/demo1/crud/forms/validation/form-controls" className="menu-link">
                        <i className="menu-bullet menu-bullet-dot">
                            <span />
                        </i>
                        <span className="menu-text">Form Controls</span>
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/metronic/demo1/crud/forms/validation/form-widgets" className="menu-link">
                        <i className="menu-bullet menu-bullet-dot">
                            <span />
                        </i>
                        <span className="menu-text">Form Widgets</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SubModulItem
