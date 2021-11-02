import React from 'react'

function NotFound() {
    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center">
                        <div className="container d-flex flex-row-fluid flex-column justify-content-md-center p-12">
                            <h1 className="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12">Oops!</h1>
                            <p className="font-weight-boldest display-4">Something went wrong here.</p>
                            <p className="font-size-h3">We're working on it and we'll get it fixed as soon possible.You can back or use our Help Center.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NotFound
