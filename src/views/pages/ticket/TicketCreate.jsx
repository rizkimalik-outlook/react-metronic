import React from 'react'
import Icons from 'views/components/Icons'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'
import TicketInformation from './TicketInformation'
import TicketHistoryTransaction from './TicketHistoryTransaction'
import TicketReportingInformation from './TicketReportingInformation'
import TicketChannelInformation from './TicketChannelInformation'
import TicketBankAccount from './TicketBankAccount'

const TicketCreate = () => {
    return (
        <MainContent>
            <SubHeader active_page="Create Ticket" menu_name="Ticket" modul_name="Create Ticket" />
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
                                    <button className="btn btn-sm btn-primary font-weight-bolder" data-toggle="tooltip" title="Create Ticket">
                                        <Icons iconName="plus" className="svg-icon svg-icon" />
                                        Create Ticket
                                    </button>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-4">
                                <TicketChannelInformation />
                                <TicketReportingInformation />
                                <TicketBankAccount />
                                <TicketHistoryTransaction />
                            </CardBody>
                        </Card>
                    </section>
                </main>
            </Container>
        </MainContent>
    )
}

export default TicketCreate
