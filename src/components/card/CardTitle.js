import React from 'react'

function CardTitle({title, subtitle}) {
    return (
        <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">{title}</span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">{subtitle}</span>
        </h3>
    )
}

export default CardTitle
