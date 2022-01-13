import React from 'react'
import { NavLink } from 'react-router-dom'

import Icons from 'views/components/Icons'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'
import {
    TicketTransaction,
    TicketBankAccount,
    // TicketChannel,
    TicketReporting,
    TicketInformation,
} from './index'

const TicketMain = () => {
   
    return (
        <MainContent>
            <SubHeader active_page="Ticket" menu_name="Main Ticket" modul_name="" />
            <Container>
                <main className="row">
                    <section className="col-lg-4">
                        <TicketInformation />
                    </section>
                    <section className="col-lg-8 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title="Ticket Detail" subtitle="Information Customer Detail." />
                                <CardToolbar>
                                    <NavLink to="/ticket/create" className="btn btn-sm btn-primary font-weight-bolder" title="Create Ticket" data-toggle="modal">
                                        <Icons iconName="plus" className="svg-icon svg-icon" />
                                        Create Ticket
                                    </NavLink>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-4">
                                {/* <TicketChannel /> */}
                                <TicketReporting />
                                <TicketBankAccount />
                                <TicketTransaction />
                            </CardBody>
                        </Card>
                    </section>
                </main>
            </Container>
        </MainContent>
    )
}

export default TicketMain
