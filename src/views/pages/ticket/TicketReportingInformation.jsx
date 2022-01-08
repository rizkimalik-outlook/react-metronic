import React from 'react'
import FormGroup from 'views/components/FormGroup'

const TicketReportingInformation = () => {
    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex align-items-center justify-content-between">
                <h4>Reporting Information</h4>
                <span className="switch switch-brand">
                    <label>
                        <input type="checkbox" name="select" />
                        <span />
                    </label>
                </span>
            </div>
            <form>
                <div className="row">
                    <div className="col-lg-4 m-0">
                        <FormGroup label="Full Name">
                            <input type="text" className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Email">
                            <input type="email" className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Phone Number">
                            <input type="number" className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                </div>
                <FormGroup label="Address">
                    <textarea className="form-control form-control-sm" cols="10" rows="4"></textarea>
                </FormGroup>
            </form>
        </div>
    )
}

export default TicketReportingInformation
