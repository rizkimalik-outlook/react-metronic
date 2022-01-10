import React from 'react'

const Modal = ({ children, id }) => {
    return (
        <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby={id} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
