import React from 'react'
import Icons from 'views/components/Icons'
import FormGroup from 'views/components/FormGroup'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'

const TicketCreate = () => {
    return (
        <MainContent>
            <SubHeader active_page="Create Ticket" menu_name="Ticket" modul_name="Create Ticket" />
            <Container>
                <main className="row">
                    <section className="col-lg-4">
                        <Card>
                            <CardHeader>
                                <CardTitle title="Customer Information" subtitle="Data Customer" />
                                <CardToolbar>
                                    <button className="btn btn-icon btn-sm btn-light-primary btn-circle" data-toggle="tooltip" title="Search Customer">
                                        <Icons iconName="search" className="svg-icon svg-icon-sm" />
                                    </button>
                                </CardToolbar>
                            </CardHeader>
                            <CardBody className="p-4">
                                <FormGroup label="Full Name">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="Phone Number">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="Email Address">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="Gender">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="Date of birth">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="NIK">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                                <FormGroup label="Address">
                                    <input type="text" className="form-control form-control-sm" />
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </section>
                    <section className="col-lg-8 pl-1">
                        <Card>
                            <CardHeader className="border-bottom">
                                <CardTitle title="Customer Detail" subtitle="Information Customer Detail." />
                            </CardHeader>
                            <CardBody className="p-4">
                                <Card>
                                    <CardBody>
                                        sda
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </section>
                </main>
            </Container>
        </MainContent>
    )
}

export default TicketCreate
