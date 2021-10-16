import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            {/*begin::Footer*/}
            <div className="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
                {/*begin::Container*/}
                <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                    {/*begin::Copyright*/}
                    <div className="text-dark order-2 order-md-1">
                        <span className="text-muted font-weight-bold mr-2">2021©</span>
                        <Link to="http://keenthemes.com/metronic" target="_blank" className="text-dark-75 text-hover-primary">Keenthemes</Link>
                    </div>
                    {/*end::Copyright*/}
                    {/*begin::Nav*/}
                    <div className="nav nav-dark">
                        <Link to="http://keenthemes.com/metronic" target="_blank" className="nav-link pl-0 pr-5">About</Link>
                        <Link to="http://keenthemes.com/metronic" target="_blank" className="nav-link pl-0 pr-5">Team</Link>
                        <Link to="http://keenthemes.com/metronic" target="_blank" className="nav-link pl-0 pr-0">Contact</Link>
                    </div>
                    {/*end::Nav*/}
                </div>
                {/*end::Container*/}
            </div>
            {/*end::Footer*/}
        </div>
    )
}

export default Footer
