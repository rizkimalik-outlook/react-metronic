import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MenuItem from './menu/MenuItem'
import axios from 'axios';
import Icons from 'components/Icons';

function Aside() {
    const location = useLocation();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        async function getMenus() {
            try {
                const res = await axios.get('/menu')
                const data = res.data.data;
                setMenu(data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getMenus()
    }, [menu])

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
                                    <MenuItem 
                                        item={item} 
                                        active={location.pathname} 
                                        key={index}
                                    >
                                    </MenuItem>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside
