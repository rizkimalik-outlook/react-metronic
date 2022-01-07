import React from 'react'
import { NavLink } from 'react-router-dom'
import Icons from '../Icons'

const ButtonCreate = ({to}) => {
    return (
        <NavLink to={to} className="btn btn-primary font-weight-bolder btn-sm m-1">
            <Icons iconName="plus" className="svg-icon svg-icon-sm" />
            Create New
        </NavLink>
    )
}

export default ButtonCreate
