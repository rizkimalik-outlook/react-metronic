import React, { useState } from 'react'
import Flatpickr from "react-flatpickr"

import Icons from 'views/components/Icons'
import FormGroup from 'views/components/FormGroup'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'
import { ButtonSubmit } from 'views/components/button'

const TicketInformation = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Card>
            <CardHeader>
                <CardTitle title="Ticket Information" subtitle="Data Customer Profile." />
                <CardToolbar>
                    <button className="btn btn-icon btn-sm btn-light-primary btn-circle" data-toggle="tooltip" title="Search Customer">
                        <Icons iconName="search" className="svg-icon svg-icon-sm" />
                    </button>
                </CardToolbar>
            </CardHeader>
            <CardBody className="p-4">
                <form>
                    <FormGroup label="Full Name" formText="customer full name">
                        <input type="text" className="form-control form-control-sm" />
                    </FormGroup>
                    <FormGroup label="Phone Number">
                        <input type="text" className="form-control form-control-sm" />
                    </FormGroup>
                    <FormGroup label="Email">
                        <input type="text" className="form-control form-control-sm" />
                    </FormGroup>
                    <FormGroup label="NIK">
                        <input type="text" className="form-control form-control-sm" />
                    </FormGroup>
                    <FormGroup label="Gender">
                        <select className="form-control form-control-sm">
                            <option value="">-- select gender--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </FormGroup>
                    <FormGroup label="Date of birth">
                        <Flatpickr
                            className="form-control form-control-sm"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </FormGroup>
                    <FormGroup label="Address">
                        <textarea className="form-control form-control-sm" cols="10" rows="4"></textarea>
                    </FormGroup>

                    <div className="d-flex justify-content-between py-4">
                        <button type="button" className="btn btn-info btn-sm m-1">
                            <Icons iconName="route" className="svg-icon svg-icon-sm" />
                            Journey
                        </button>
                        <ButtonSubmit />
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default TicketInformation
