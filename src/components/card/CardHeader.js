import React from 'react'

function CardHeader({ children }) {
    return (
        <div className="card-header border-0 pt-4">
            { children }
        </div>
    )
}

export default CardHeader
