import React from 'react'
import Icons from '../Icons'

const ButtonDelete = ({ onClick }) => {
    return (
        <button onClick={onclick} type="button" className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-1" data-toggle="tooltip" title="Button Delete">
            <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
        </button>
    )
}

export default ButtonDelete
