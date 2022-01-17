import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormGroup from 'views/components/FormGroup'
import { setReportingCustomer } from 'app/slice/sliceTicket';

const TicketReporting = () => {
    const dispatch = useDispatch();
    const { selected_customer, reporting_customer } = useSelector(state => state.ticket);
    const customer = selected_customer;

    const [fields, setFields] = useState({
        checked: false,
        cust_name: '',
        cust_email: '',
        cust_telephone: '',
        cust_address: ''
    });

    const onHandleCheckBox = (value) => {
        if (value) {
            dispatch(setReportingCustomer({
                checked: true,
                cust_name: customer.name,
                cust_email: customer.email,
                cust_telephone: customer.telephone,
                cust_address: customer.address
            }))
        } else {
            dispatch(setReportingCustomer({
                checked: false,
                cust_name: fields.cust_name,
                cust_email: fields.cust_email,
                cust_telephone: fields.cust_telephone,
                cust_address: fields.cust_address
            }))
        }
    }

    const onHandleChange = (event) => {
        const name = event.target.name;
        setFields({
            ...fields,
            [name]: event.target.value
        });

        dispatch(setReportingCustomer({
            checked: false,
            cust_name: fields.cust_name,
            cust_email: fields.cust_email,
            cust_telephone: fields.cust_telephone,
            cust_address: fields.cust_address
        }))
    }

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex align-items-center justify-content-between">
                <h4>Reporting Information</h4>
                <span className="switch switch-brand">
                    <label>
                        <input type="checkbox" name="checked" checked={reporting_customer.checked} onChange={(e) => onHandleCheckBox(e.target.checked)} />
                        <span />
                    </label>
                </span>
            </div>
            <form>
                <div className="row">
                    <div className="col-lg-4 m-0">
                        <FormGroup label="Full Name">
                            <input type="text" name="cust_name" defaultValue={reporting_customer.cust_name} onKeyUp={(e) => onHandleChange(e)} className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Email">
                            <input type="email" name="cust_email" defaultValue={reporting_customer.cust_email} onKeyUp={(e) => onHandleChange(e)} className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Phone Number">
                            <input type="number" name="cust_telephone" defaultValue={reporting_customer.cust_telephone} onKeyUp={(e) => onHandleChange(e)} className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                </div>
                <FormGroup label="Address">
                    <textarea name="cust_address" defaultValue={reporting_customer.cust_address} onKeyUp={(e) => onHandleChange(e)} className="form-control form-control-sm" cols="10" rows="4"></textarea>
                </FormGroup>
            </form>
        </div>
    )
}

export default TicketReporting
