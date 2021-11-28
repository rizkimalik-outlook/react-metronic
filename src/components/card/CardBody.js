import React from 'react'

function CardBody({ children, className }) {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    )
}

export default CardBody
