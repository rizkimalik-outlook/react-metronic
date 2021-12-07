import { Container, MainContent, SubHeader } from 'layouts/partials'
import React from 'react'

function NotFound() {
    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <h1 className="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12">Oops!</h1>
                <p className="font-weight-boldest display-4">Something went wrong here.</p>
                <p className="font-size-h3">We're working on it and we'll get it fixed as soon possible.You can back or use our Help Center.</p>
            </Container>
        </MainContent>
    )
}

export default NotFound
