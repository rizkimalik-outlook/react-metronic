import React from 'react'
import { NavLink } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

            <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-1">
                        <div className="d-flex align-items-baseline flex-wrap mr-5">
                            <h5 className="text-dark font-weight-bold my-1 mr-5">Dashboard</h5>
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
                        <button  className="btn btn-light-primary font-weight-bolder btn-sm">Actions</button>
                    </div>
                </div>
            </div>


            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="alert alert-custom alert-white alert-shadow fade show gutter-b" role="alert">
                        <div className="alert-icon">
                            {/* <span className="svg-icon svg-icon-primary svg-icon-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <rect x={0} y={0} width={24} height={24} />
                                        <path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3" />
                                        <path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fillRule="nonzero" />
                                    </g>
                                </svg>
                            </span> */}
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
                                            <div className="table-responsive">
                                                <table className="table table-borderless table-vertical-center">
                                                    <thead>
                                                        <tr>
                                                            <th className="p-0 w-40px" />
                                                            <th className="p-0 min-w-200px" />
                                                            <th className="p-0 min-w-100px" />
                                                            <th className="p-0 min-w-125px" />
                                                            <th className="p-0 min-w-110px" />
                                                            <th className="p-0 min-w-150px" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pl-0 py-4">
                                                                <div className="symbol symbol-50 symbol-light">
                                                                    <span className="symbol-label">
                                                                        <img src="/assets/media/svg/misc/014-kickstarter.svg" className="h-50 align-self-center" alt="simbol" />
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="pl-0">
                                                                <NavLink to="/dashboard" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">KTR Mobile Application</NavLink>
                                                                <div>
                                                                    <span className="font-weight-bolder">Email:</span>
                                                                    <NavLink to="/dashboard" className="text-muted font-weight-bold text-hover-primary">ktr@demo.com</NavLink>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">$45,200,000</span>
                                                                <span className="text-muted font-weight-bold">Paid</span>
                                                            </td>
                                                            <td className="text-right">
                                                                <span className="text-muted font-weight-500">ReactJS, Ruby</span>
                                                            </td>
                                                            <td className="text-right">
                                                                <span className="label label-lg label-light-warning label-inline">In Progress</span>
                                                            </td>
                                                            <td className="text-right pr-0">
                                                                <button className="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                                                        {/*begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/General/Settings-1.svg*/}
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" fill="none">
                                                                                <rect x={0} y={0} width={24} height={24} />
                                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000" />
                                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3" />
                                                                            </g>
                                                                        </svg>
                                                                        {/*end::Svg Icon*/}
                                                                    </span>
                                                                </button>
                                                                <button className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                                                        {/*begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Communication/Write.svg*/}
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" fill="none">
                                                                                <rect x={0} y={0} width={24} height={24} />
                                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fillRule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)">
                                                                                </path>
                                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                                            </g>
                                                                        </svg>
                                                                        {/*end::Svg Icon*/}
                                                                    </span>
                                                                </button>
                                                                <button className="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                                                        {/*begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/General/Trash.svg*/}
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" fill="none">
                                                                                <rect x={0} y={0} width={24} height={24} />
                                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero" />
                                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3" />
                                                                            </g>
                                                                        </svg>
                                                                        {/*end::Svg Icon*/}
                                                                    </span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
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

export default Dashboard
