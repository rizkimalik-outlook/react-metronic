import React from 'react'
import { NavLink } from 'react-router-dom'

const ButtonCancel = ({to}) => {
    return (
        <NavLink to={to} className="btn btn-sm btn-secondary m-1">
            Cancel
        </NavLink>
    )
}

export default ButtonCancel
