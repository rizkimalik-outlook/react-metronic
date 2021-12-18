import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MenuItem from './menu/MenuItem'
import Icons from 'views/components/Icons';
import { getMenu } from 'api/menu';
import MendawaiLogo from 'views/components/MendawaiLogo';

function Aside() {
    const location = useLocation();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        async function getMenus() {
            try {
                const res = await getMenu();
                const data = res.data.data;
                setMenu(data)
            }
            catch (error) {
                console.log(error.message);
            }
        }
        getMenus()
    }, [menu])

    return (
        <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto shadow-none border" id="kt_aside">
            <div className="brand flex-column-auto" id="kt_brand">
                <NavLink to="/general" className="brand-logo">
                    <MendawaiLogo className="max-h-50px" />
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
