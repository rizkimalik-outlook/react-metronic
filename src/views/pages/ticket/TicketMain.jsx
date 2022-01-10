import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

import Icons from 'views/components/Icons'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'
import {
    TicketCreate,
    TicketHistory,
    TicketBankAccount,
    // TicketChannel,
    TicketReporting,
    TicketInformation,
} from './index'

const TicketMain = () => {
    const [checked, getChecked] = useState(false);
    const customer = useSelector(state => state.ticket.selected_customer);

    function isSelected(){
        if (!customer.customer_id) {
            getChecked(false)
            Swal.fire({
                title: "Empty Customer.",
                text: "Please select a customer!",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            });
        }
        else if (customer.status !== 'Registered') {
            getChecked(false)
            Swal.fire({
                title: "Invalid Customer.",
                text: "Customer data not Registered!",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            });
        }
        else {
            getChecked(true)
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Create Ticket" menu_name="Ticket" modul_name="Create Ticket" />
            <Container>
                {checked && <TicketCreate customer={customer} />}
                <main className="row">
                    <section className="col-lg-4">
                        <TicketInformation />
                    </section>
                    <section className="col-lg-8 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title="Ticket Detail" subtitle="Information Customer Detail." />
                                <CardToolbar>
                                    <button onClick={isSelected} className="btn btn-sm btn-primary font-weight-bolder" title="Create Ticket" data-toggle="modal" data-target="#modalCreateTicket">
                                        <Icons iconName="plus" className="svg-icon svg-icon" />
                                        Create Ticket
                                    </button>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-4">
                                {/* <TicketChannel /> */}
                                <TicketReporting />
                                <TicketBankAccount />
                                <TicketHistory />
                            </CardBody>
                        </Card>
                    </section>
                </main>
            </Container>
        </MainContent>
    )
}

export default TicketMain
