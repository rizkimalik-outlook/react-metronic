import React from 'react'
import Icons from '../Icons'

const ButtonExport = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick} className="btn btn-light-primary font-weight-bolder btn-sm m-1">
            <Icons iconName="pen-and-rules" className="svg-icon svg-icon-sm" />
            Export
        </button>
    )
}

export default ButtonExport
