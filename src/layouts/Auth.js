import React from 'react';

// import Aside from './partials/Aside';
import Footer from './partials/Footer';
import Header from './partials/Header';


function Auth(props) {
    const { children } = props;

    return (
        <div className="d-flex flex-row flex-column-fluid page">
            {/* <Aside /> */}
            <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                <Header />

                {children}

                <Footer />
            </div>
        </div>
    )
}

export default Auth
