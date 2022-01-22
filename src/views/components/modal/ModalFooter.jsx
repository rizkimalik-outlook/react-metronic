import React from 'react'

const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer d-flex justify-content-between p-2">
            <button type="button" className="btn btn-sm btn-light-primary font-weight-bold m-1" data-dismiss="modal">Close</button>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ModalFooter
