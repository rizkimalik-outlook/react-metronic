import React from 'react';
import { Link } from 'react-router-dom';

// import MendawaiLogo from '../components/MendawaiLogo'
import MendawaiLogo from 'components/MendawaiLogo';





function Guest({children}) {

    return (
        <div className="flex-row align-items-center vh-100 bg-guest">
            <div className="container">
                <div className="justify-content-center row">
                    <div className="col-md-4">
                        <div className="d-flex flex-center mb-15 mt-20">
                            <Link to="/">
                                <MendawaiLogo className="max-h-75px" />
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guest
