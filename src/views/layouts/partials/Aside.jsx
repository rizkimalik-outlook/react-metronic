import React/* , { useEffect } */ from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
import MenuItem from './menu/MenuItem'
import Icons from 'views/components/Icons';
import MendawaiLogo from 'views/components/MendawaiLogo';
// import { getMainMenu } from 'app/services/apiMenu'

function Aside({ main_menu }) {
    const location = useLocation();
    // const dispatch = useDispatch();
    // const { main_menu } = useSelector(state => state.mainmenu);

    // useEffect(() => {
    //     console.log('load menu.')
    //     dispatch(getMainMenu())
    // }, [dispatch]); 


    return (
        <aside className="aside aside-left aside-fixed d-flex flex-column flex-row-auto shadow-none border" id="kt_aside">
            <div className="brand flex-column-auto" id="kt_brand">
                <NavLink to="/general" className="brand-logo">
                    <MendawaiLogo className="max-h-50px" />
                </NavLink>
                <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                    <Icons iconName="angle-double-left" className="svg-icon svg-icon svg-icon-xl" />
                </button>
            </div>

            <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                <nav id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical={1} data-menu-scroll={1} data-menu-dropdown-timeout={500}>
                    <ul className="menu-nav">
                        {
                            main_menu?.map((item, index) => {
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
                </nav>
            </div>
        </aside>
    )
}

export default Aside
