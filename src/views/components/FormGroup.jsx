import React from 'react'

const FormGroup = ({ children, label, formText }) => {
    return (
        <div className="form-group p-0 mb-4">
            <label>{label} :</label>
            {children}
            {formText && <span className="form-text text-muted">{formText}</span>}
        </div>
    )
}

export default FormGroup
