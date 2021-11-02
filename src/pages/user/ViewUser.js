import React from 'react';
import { useParams } from 'react-router-dom';

function View() {
    let { username } = useParams();
    console.log(username);

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

            <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <div className="d-flex align-items-baseline flex-wrap mr-5">
                            <h5 className="text-dark font-weight-bold my-1 mr-5">User</h5>
                            <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                                <li className="breadcrumb-item text-muted">
                                    <span className="text-muted">List Users</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button  className="btn btn-light-primary font-weight-bolder btn-sm">Actions</button>
                    </div>
                </div>
            </div>


            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label font-weight-bolder text-dark">New Arrivals</span>
                                        <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                                    </h3>
                                </div>

                                <div className="card-body pt-2 pb-0 mt-n3">
                                    <div className="tab-content mt-5" id="myTabTables11">
                                        <div className="tab-pane fade active show" id="kt_tab_pane_11_3" role="tabpanel" aria-labelledby="kt_tab_pane_11_3">
                                            Profile : {username}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default View
