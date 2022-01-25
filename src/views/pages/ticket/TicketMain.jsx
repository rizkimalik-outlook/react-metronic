import React from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import Icons from 'views/components/Icons'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card'
import {
    TicketTransaction,
    // TicketBankAccount,
    // TicketChannel,
    TicketReporting,
    TicketInformation,
    TicketCreate,
} from './index'

const TicketMain = () => {
    const { selected_customer, reporting_customer } = useSelector(state => state.ticket);
    const customer = selected_customer;

    function onCheckValidation() {
        if (!customer.customer_id) {
            Swal.fire({
                title: "Empty Customer.",
                text: "Please select a customer!",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            })
        }
        else if (customer.status !== 'Registered') {
            Swal.fire({
                title: "Invalid Customer.",
                text: "Customer data not Registered!",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            })
        }
        else if (!reporting_customer.cust_email) {
            Swal.fire({
                title: "Invalid Customer.",
                text: "Please enter reporting customer",
                buttonsStyling: false,
                icon: "warning",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            })
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Ticket" menu_name="Main Ticket" modul_name="">
                <button type="button" onClick={onCheckValidation} className="btn btn-sm btn-primary font-weight-bolder" title="Create Ticket" data-toggle="modal" data-target="#modalCreateTicket">
                    <Icons iconName="plus" className="svg-icon svg-icon" />
                    Create Ticket
                </button>
            </SubHeader>
            <Container>
                {customer.customer_id && reporting_customer.cust_email && <TicketCreate customer={customer} />}
                <main className="row">
                    <section className="col-lg-4">
                        <TicketInformation />
                    </section>
                    <section className="col-lg-8 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title="Ticket Detail" subtitle="Information Customer Detail." />
                            </CardHeader>
                            <CardBody className="p-4">
                                <TicketReporting />
                                <TicketTransaction />
                                {/* <TicketChannel /> */}
                                {/* <TicketBankAccount /> */}
                            </CardBody>
                        </Card>
                    </section>
                </main>
            </Container>
        </MainContent>
    )
}

export default TicketMain
