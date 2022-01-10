import React from 'react'

const ModalHeader = ({ title }) => {
    return (
        <div className="modal-header p-6">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i aria-hidden="true" className="ki ki-close" />
            </button>
        </div>
    )
}

export default ModalHeader
