import React from 'react';

function Card({ children }) {
    return (
        <div className="card card-custom card-stretch gutter-b card-border">
            {children}
        </div>
    )
}

export default Card
