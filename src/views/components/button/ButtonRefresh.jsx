import React from 'react';
import Icons from '../Icons'

const ButtonRefresh = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick} className="btn btn-icon btn-sm btn-light-primary btn-circle m-1" title="refresh data">
            <Icons iconName="refresh" className="svg-icon svg-icon-sm" />
        </button>
    )
}

export default ButtonRefresh
