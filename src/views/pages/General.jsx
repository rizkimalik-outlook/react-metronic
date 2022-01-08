import React, { useState } from 'react'
import Flatpickr from "react-flatpickr"

function General() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <div className="d-flex align-items-baseline flex-wrap mr-5">
                            <h5 className="text-dark font-weight-bold my-1 mr-5">General</h5>
                            <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">Features</span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">Cards</span>
                                </li>
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">General Cards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light-primary font-weight-bolder btn-sm">Actions</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container">
                                <h3>flatpickr</h3>
                                <Flatpickr
                                    className="form-control form-control-sm"
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    options={{
                                        enableTime: true,
                                        dateFormat: "Y-m-d H:i:S",

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
