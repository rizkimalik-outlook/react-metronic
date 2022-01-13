import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


import { ButtonSubmit } from 'views/components/button'
import FormGroup from 'views/components/FormGroup'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'views/components/modal'
import { apiMasterChannel } from 'app/services/apiMasterData'
import { authUser } from 'app/slice/sliceAuth'
import { apiTicketStore } from 'app/services/apiTicket'

const TicketCreateModal = ({customer}) => {
    const dispatch = useDispatch();
    const { username } = useSelector(authUser)
    const { channels } = useSelector(state => state.master);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        window.onSelectPicker();
        dispatch(apiMasterChannel())
        reset({ user_create: username })
    }, [dispatch, reset, username]);

    const onSubmitCreateTicket = async (data) => {
        try {
            data.customer_id = customer.customer_id;
            data.date_create = (data.date_create).replace('T', ' ');
            const { payload } = await dispatch(apiTicketStore(data));
            if (payload.status === 200) {
                Swal.fire({
                    title: "Ticket Created.",
                    text: "Success into application!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal id="modalCreateTicket">
            <ModalHeader title="Create Ticket" />
            <form onSubmit={handleSubmit(onSubmitCreateTicket)}>
                <ModalBody>
                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Date Transaction">
                                <input {...register("date_create", { required: true })}
                                    type="datetime-local"
                                    className="form-control form-control-md"
                                />
                                {errors.date_create && <span className="form-text text-danger">Please select channel</span>}
                            </FormGroup>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-3">
                            <FormGroup label="Channel">
                                <select className="form-control selectpicker" {...register("ticket_source", { required: true })}>
                                    <option value="">-- select channel --</option>
                                    {
                                        channels.map((item) => {
                                            return <option value={item.channel} key={item.id}>{item.channel}</option>
                                        })
                                    }
                                </select>
                                {errors.ticket_source && <span className="form-text text-danger">Please select channel</span>}
                            </FormGroup>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Agent Name">
                                <input {...register("user_create", { required: true })}
                                    type="text"
                                    className="form-control form-control-md"
                                    readOnly
                                />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Priority Scale">
                                <input type="datetime-local" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Type Customer">
                                <select className="form-control form-control-md selectpicker" name="param" data-size="7" data-live-search="true">
                                    <option data-icon="fa fa-search text-primary" value="AZ">Arizona</option>
                                    <option data-icon="fa fa-user text-warning" value="CO">Colorado</option>
                                    <option data-icon="fa fa-home text-primary" value="ID">Idaho</option>
                                </select>
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Source Information">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Category">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Product">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Case">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SubCategory Detail">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup label="Complaint">
                                <textarea className="form-control form-control-md" cols="10" rows="4"></textarea>
                            </FormGroup>
                        </div>
                        <div className="col-lg-6">
                            <FormGroup label="Response">
                                <textarea className="form-control form-control-md" cols="10" rows="4"></textarea>
                            </FormGroup>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-lg-3">
                            <FormGroup label="Type Complaint">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Ticket Status">
                                <select className="form-control form-control-md selectpicker" {...register("status", { required: true })}>
                                    <option value="">-- select status --</option>
                                    <option value="Open">Open</option>
                                    <option value="Close">Close</option>
                                </select>
                                {errors.status && <span className="form-text text-danger">Please select status</span>}
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="Eskalation Unit">
                                <input type="text" className="form-control form-control-md" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-3">
                            <FormGroup label="SLA (Days)">
                                <input type="text" className="form-control form-control-md" />
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

export default TicketCreateModal
