import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListCustomer } from 'app/services/apiSosmed';


function General() {
    const dispatch = useDispatch();
    const list_customers = useSelector(state => state.sosialmedia.list_customers);

    useEffect(() => {
        dispatch(getListCustomer())
    }, [dispatch]);

    console.log(list_customers)

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
                    <div className="alert alert-custom alert-white alert-shadow fade show gutter-b" role="alert">
                        <div className="alert-icon">
                            <span className="svg-icon svg-icon-primary svg-icon-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <rect x={0} y={0} width={24} height={24} />
                                        <path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3" />
                                        <path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fillRule="nonzero" />
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <div className="alert-text">Metronic extends
                            <code>Bootstrap Card</code>with
                            <code>.card-custom</code>class to provide a wide range of options for multi-purpose cards.
                            <br />For more info please visit Bootstrap Card's
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label font-weight-bolder text-dark">New Arrivals</span>
                                        <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                                    </h3>
                                    <div className="card-toolbar">
                                        <ul className="nav nav-pills nav-pills-sm nav-dark-75">
                                            <li className="nav-item">
                                                <a className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_1">Month</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_2">Week</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_tab_pane_11_3">Day</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-body pt-2 pb-0 mt-n3">
                                    <div className="tab-content mt-5" id="myTabTables11">
                                        <div className="tab-pane fade active show" id="kt_tab_pane_11_3" role="tabpanel" aria-labelledby="kt_tab_pane_11_3">

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

export default General
