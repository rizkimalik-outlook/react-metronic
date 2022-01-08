import React from 'react'
import { NavLink } from 'react-router-dom'
import Icons from '../Icons'

const ButtonEdit = ({to}) => {
    return (
        <NavLink to={to} className="btn btn-icon btn-light-warning btn-hover-warning btn-sm mx-1" data-toggle="tooltip" title="Button Edit">
            <Icons iconName="write" className="svg-icon svg-icon-sm svg-icon-warning" />
        </NavLink>
    )
}

export default ButtonEdit
