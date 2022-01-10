import React from 'react'

const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer p-2">
            <button type="button" className="btn btn-sm btn-light-primary font-weight-bold m-1" data-dismiss="modal">Close</button>
            {children}
        </div>
    )
}

export default ModalFooter
