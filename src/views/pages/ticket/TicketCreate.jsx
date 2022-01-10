import React from 'react'
import { ButtonSubmit } from 'views/components/button'
import FormGroup from 'views/components/FormGroup'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'views/components/modal'

const TicketCreate = () => {
    return (
        <Modal id="modalCreateTicket">
            <ModalHeader title="Create Ticket" />
            <form>
                <ModalBody>
                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Date Transaction">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-3">
                            <FormGroup label="Channel">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Agent Name">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Priority Scale">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Type Customer">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Source Information">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Category">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Product">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Case">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Detail">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup label="Complaint">
                                <textarea className="form-control form-control-sm" cols="10" rows="4"></textarea>
                            </FormGroup>
                        </div>
                        <div className="col-lg-6">
                            <FormGroup label="Response">
                                <textarea className="form-control form-control-sm" cols="10" rows="4"></textarea>
                            </FormGroup>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Type Complaint">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Ticket Status">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Eskalation Unit">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SLA (Days)">
                                <input type="text" className="form-control form-control-sm" />
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ButtonSubmit />
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default TicketCreate
