import React from 'react'

const ModalBody = ({ children, className }) => {
    return (
        <div className={`modal-body ${className}`}>
            {children}
        </div>
    )
}

export default ModalBody
