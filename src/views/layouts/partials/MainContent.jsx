import React from 'react';

function MainContent({children}) {
    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            {children}
        </div>
    )
}

export default MainContent;
