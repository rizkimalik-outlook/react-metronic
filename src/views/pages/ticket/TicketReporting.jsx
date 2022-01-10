import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import FormGroup from 'views/components/FormGroup'

const TicketReporting = () => {
    const [checked, setChecked] = useState(false);
    const customer = useSelector(state => state.ticket.selected_customer);
    const [fields, setFields] = useState({
        cust_name: '',
        cust_email: '',
        cust_telephone: '',
        cust_address: ''
    });

    useEffect(() => {
        function getChecked() {
            if (checked) {
                setFields({
                    cust_name: customer.name,
                    cust_email: customer.email,
                    cust_telephone: customer.telephone,
                    cust_address: customer.address
                });
            }
            else {
                setFields({
                    cust_name: '',
                    cust_email: '',
                    cust_telephone: '',
                    cust_address: ''
                });
            }
        }
        getChecked();
    }, [checked, customer]);

    /* const onHandleChange = (event) => {
        const name = event.target.name;
        setFields({
            ...fields,
            [name]: event.target.value
        });
    } */

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex align-items-center justify-content-between">
                <h4>Reporting Information</h4>
                <span className="switch switch-brand">
                    <label>
                        <input type="checkbox" name="select" onChange={(e) => setChecked(e.target.checked)} />
                        <span />
                    </label>
                </span>
            </div>
            <form>
                <div className="row">
                    <div className="col-lg-4 m-0">
                        <FormGroup label="Full Name">
                            <input type="text" name="cust_name" defaultValue={fields.cust_name} /* onChange={onHandleChange} */ className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Email">
                            <input type="email" name="cust_email" defaultValue={fields.cust_email} /* onChange={onHandleChange} */ className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Phone Number">
                            <input type="number" name="cust_telephone" defaultValue={fields.cust_telephone} /* onChange={onHandleChange} */ className="form-control form-control-sm" />
                        </FormGroup>
                    </div>
                </div>
                <FormGroup label="Address">
                    <textarea name="cust_address" defaultValue={fields.cust_address} /* onChange={onHandleChange} */ className="form-control form-control-sm" cols="10" rows="4"></textarea>
                </FormGroup>
            </form>
        </div>
    )
}

export default TicketReporting
