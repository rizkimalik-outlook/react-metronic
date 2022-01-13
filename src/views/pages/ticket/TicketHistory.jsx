import React from 'react'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'

const TicketHistory = () => {
    return (
        <MainContent>
            <SubHeader active_page="Create Ticket" menu_name="Ticket" modul_name="Create Ticket" />
            <Container>
                <h1>history ticket</h1>
            </Container>
        </MainContent>
    )
}

export default TicketHistory
