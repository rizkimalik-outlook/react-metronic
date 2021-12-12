import React from 'react';

function Container({ children }) {
    return (
        <div className="d-lg-flex flex-column-fluid">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container
