import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button'
import FormGroup from 'views/components/FormGroup'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'
import { apiMasterChannel, apiMasterStatus } from 'app/services/apiMasterData'
import { authUser } from 'app/slice/sliceAuth'
import { apiTicketStore } from 'app/services/apiTicket'

const TicketCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { username } = useSelector(authUser)
    const { channels, status } = useSelector(state => state.master);
    const customer = useSelector(state => state.ticket.selected_customer);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        window.onSelectPicker();
        dispatch(apiMasterChannel())
        dispatch(apiMasterStatus())
        reset({ user_create: username })

        function onCheckCustomerID() {
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
                }).then(() => {
                    history.push('/ticket')
                });
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
                }).then(() => {
                    history.push('/ticket')
                });;
            }
        }
        onCheckCustomerID();
    }, [dispatch, reset, username, history, customer]);

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
        <MainContent>
            <SubHeader active_page="Ticket" menu_name="Create Ticket" modul_name="" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Create Ticket" subtitle="Form create ticket for customer complaint." />
                        <CardToolbar>
                            <button type="button" className="btn btn-light-primary btn-sm">CustomerID : <b>{customer.customer_id}</b></button>
                        </CardToolbar>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitCreateTicket)}>
                        <CardBody>
                            <div className="row">
                                <div className="col-lg-3">
                                    <FormGroup label="Date Transaction">
                                        <input {...register("date_create", { required: true })}
                                            type="datetime-local"
                                            className="form-control form-control-md"
                                        />
                                        {errors.date_create && <span className="form-text text-danger">Please select date</span>}
                                    </FormGroup>
                                </div>
                                <div className="col-lg-6"></div>
                                <div className="col-lg-3">
                                    <FormGroup label="Channel">
                                        <select className="form-control selectpicker" {...register("ticket_source", { required: true })}>
                                            <option value="">-- select channel --</option>
                                            {
                                                channels.map((item) => {
                                                    return <option data-icon={`${item.icon} text-primary`} value={item.channel} key={item.id}>{item.channel}</option>
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
                                        <textarea {...register("complaint_detail", { required: true })} className="form-control form-control-md" cols="10" rows="4"></textarea>
                                        {errors.complaint_detail && <span className="form-text text-danger">Please enter complaint</span>}
                                    </FormGroup>
                                </div>
                                <div className="col-lg-6">
                                    <FormGroup label="Response">
                                        <textarea {...register("response_detail", { required: true })} className="form-control form-control-md" cols="10" rows="4"></textarea>
                                        {errors.response_detail && <span className="form-text text-danger">Please select response</span>}
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div className="col-lg-3">
                                    <FormGroup label="Type Complaint">
                                        <select {...register("type_complaint", { required: true })} className="form-control form-control-md selectpicker">
                                            <option value="">-- select type --</option>
                                            <option data-icon="fa fa-edit text-primary" value="Written"> Written</option>
                                            <option data-icon="fa fa-microphone text-primary" value="Verbal"> Verbal</option>
                                        </select>
                                        {errors.type_complaint && <span className="form-text text-danger">Please select type</span>}
                                    </FormGroup>
                                </div>
                                <div className="col-lg-3">
                                    <FormGroup label="Ticket Status">
                                        <select className="form-control form-control-md selectpicker" {...register("status", { required: true })}>
                                            <option value="">-- select status --</option>
                                            {
                                                status.map((item) => {
                                                    return <option data-icon={`${item.icon} text-primary`} value={item.status} key={item.id}>{item.status}</option>
                                                })
                                            }
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
                        </CardBody>
                        <CardFooter>
                            <ButtonCancel to="/ticket" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>

            </Container>
        </MainContent>
    )
}

export default TicketCreate
