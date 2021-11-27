import React from 'react'

function CardHeader({ children }) {
    return (
        <div className="card-header border-0 pt-5">
            { children }
        </div>
    )
}

export default CardHeader
