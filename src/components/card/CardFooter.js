import React from 'react'

function CardFooter({ children }) {
    return (
        <div className="card-footer p-5 d-flex justify-content-between">
            {children}
        </div>
    )
}

export default CardFooter
