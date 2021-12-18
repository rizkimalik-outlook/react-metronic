import React from 'react'

function CardHeader({ children,className }) {
    return (
        <div className={`card-header pt-4 ${className}`}>
            { children }
        </div>
    )
}

export default CardHeader
