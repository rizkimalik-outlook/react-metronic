import React from 'react'

function SubHeader({ active_page, menu_name, modul_name }) {
    return (
        <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
            <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <div className="d-flex align-items-center flex-wrap mr-1">
                    <div className="d-flex align-items-baseline flex-wrap mr-5">
                        <h5 className="text-dark font-weight-bold my-1 mr-5">{active_page}</h5>

                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li className="breadcrumb-item text-muted">
                            <span className="text-muted">{menu_name}</span>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <span className="text-muted">{modul_name}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SubHeader
