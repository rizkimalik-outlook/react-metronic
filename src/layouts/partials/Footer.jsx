import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <div className="footer bg-white py-4 d-flex flex-lg-column shadow-none border-top" id="kt_footer">
                <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <div className="text-dark order-2 order-md-1">
                        <span className="text-muted font-weight-bold mr-2">2021 ©</span>
                        <Link to="https://mendawai.com/" target="_blank" className="text-dark-75 text-hover-primary">Mendawai</Link>
                    </div>
                    <div className="nav nav-dark">
                        <Link to="https://mendawai.com/#services" target="_blank" className="nav-link pl-0 pr-5">Services</Link>
                        <Link to="https://mendawai.com/#features" target="_blank" className="nav-link pl-0 pr-5">Features</Link>
                        <Link to="https://mendawai.com/#contact" target="_blank" className="nav-link pl-0 pr-0">Contact</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
