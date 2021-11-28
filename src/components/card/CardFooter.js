import React from 'react'

function CardFooter({ children }) {
    return (
        <div className="card-footer p-5">
            <div className="row">
                <div className="col-lg-6" />
                <div className="col-lg-6 text-right">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CardFooter
