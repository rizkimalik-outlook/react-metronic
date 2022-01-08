import React from 'react'
import Icons from '../Icons'

const ButtonSubmit = () => {
    return (
        <button type="submit" className="btn btn-primary font-weight-bolder btn-sm m-1">
            <Icons iconName="save" className="svg-icon svg-icon-sm" />
            Save changes
        </button>
    )
}

export default ButtonSubmit
