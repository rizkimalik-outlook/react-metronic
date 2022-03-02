import React from 'react'

function Footer() {
    return (
        <footer className="footer bg-white py-4 d-flex flex-lg-column shadow-none border-top" id="kt_footer">
            <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="text-dark order-2 order-md-1 pt-2">
                    <span className="text-muted font-weight-bold mr-2">2022 ©</span>
                    <a href="https://mendawai.com/" target="_blank" rel="noreferrer" className="text-dark-75 text-hover-primary">Mendawai Helpdesk</a>
                </div>
                {/* <div className="nav nav-dark">
                    <a href="https://mendawai.com/#services" target="_blank" rel="noreferrer" className="nav-link pl-0 pr-5">Services</a>
                    <a href="https://mendawai.com/#features" target="_blank" rel="noreferrer" className="nav-link pl-0 pr-5">Features</a>
                    <a href="https://mendawai.com/#contact" target="_blank" rel="noreferrer" className="nav-link pl-0 pr-0">Contact</a>
                </div> */}
            </div>
        </footer>
    )
}

export default Footer
