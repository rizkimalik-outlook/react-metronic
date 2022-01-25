import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Icons from 'views/components/Icons'
import { ButtonSubmit } from 'views/components/button'
import FormGroup from 'views/components/FormGroup'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'views/components/modal'
import { authUser } from 'app/slice/sliceAuth'
import { apiMasterChannel, apiMasterStatus } from 'app/services/apiMasterData'
import { apiDataPublish, apiHistoryTransaction, apiPublish, apiTicketStore } from 'app/services/apiTicket'
import {
    apiCategoryList,
    apiSubCategoryLv1,
    apiSubCategoryLv2,
    apiSubCategoryLv3,
    apiSubCategoryLv3Show
} from 'app/services/apiCategory';
import {
    TicketPublish,
    TicketInteraction,
    TicketEscalation,
    TicketAttachment
} from './index'

const TicketCreateModal = ({ customer }) => {
    const dispatch = useDispatch();
    const { username } = useSelector(authUser)
    const { channels, status } = useSelector(state => state.master);
    const { reporting_customer } = useSelector(state => state.ticket);
    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const {
        category,
        category_sublv1,
        category_sublv2,
        category_sublv3,
        category_sublv3_detail,
    } = useSelector(state => state.category);

    useEffect(() => {
        const { sla, org_id } = category_sublv3_detail;
        dispatch(apiMasterChannel())
        dispatch(apiMasterStatus())
        dispatch(apiCategoryList())

        setValue('user_create', username)
        setValue('sla', sla)
        setValue('org_id', org_id)
    }, [dispatch, setValue, username, category_sublv3_detail]);

    const onSubmitCreateTicket = async (data) => {
        try {
            const data_store = Object.assign({}, data, reporting_customer);
            const { customer_id } = data_store;
            data_store.date_create = (data_store.date_create).replace('T', ' ');
            const { payload } = await dispatch(apiTicketStore(data_store));
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
                dispatch(apiHistoryTransaction({ customer_id }))
                dispatch(apiDataPublish({ customer_id }))
                reset({ user_create: username })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitPublish = async () => {
        const { customer_id } = customer;
        const { payload } = await dispatch(apiPublish({ customer_id }));
        if (payload.status === 200) {
            Swal.fire({
                title: "Ticket Published.",
                text: "Success publish ticket!",
                buttonsStyling: false,
                icon: "success",
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: "btn btn-primary"
                },
            });
            dispatch(apiDataPublish({ customer_id }))
            dispatch(apiHistoryTransaction({ customer_id }))
        }
    }

    return (
        <Modal id="modalCreateTicket">
            <ModalHeader title="Create Ticket" />
            <ModalBody>
                <div className="example-preview">
                    <ul className="nav nav-tabs" id="tablistCreateTicket" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="tabFormCreateTicket" data-toggle="tab" href="#contentFormCreateTicket">
                                <span className="nav-icon">
                                    <Icons iconName="ticket" className="svg-icon svg-icon-sm" />
                                </span>
                                <span className="nav-text">Form Create Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabInteractionTicket" data-toggle="tab" href="#contentInteractionTicket" aria-controls="contentInteractionTicket">
                                <span className="nav-icon">
                                    <Icons iconName="substract" className="svg-icon svg-icon-sm" />
                                </span>
                                <span className="nav-text">Interaction Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabEscalationTicket" data-toggle="tab" href="#contentEscalationTicket" aria-controls="contentEscalationTicket">
                                <span className="nav-icon">
                                    <Icons iconName="layer" className="svg-icon svg-icon-sm" />
                                </span>
                                <span className="nav-text">Escalation Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabAttachmentTicket" data-toggle="tab" href="#contentAttachmentTicket" aria-controls="contentAttachmentTicket">
                                <span className="nav-icon">
                                    <Icons iconName="attachment" className="svg-icon svg-icon-sm" />
                                </span>
                                <span className="nav-text">Attachment Ticket</span>
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content mt-5" id="contentCreateTicket">
                        <div className="tab-pane fade active show" id="contentFormCreateTicket" role="tabpanel" aria-labelledby="tabFormCreateTicket">
                            <form onSubmit={handleSubmit(onSubmitCreateTicket)}>
                                <input type="hidden" value={customer.customer_id} {...register("customer_id", { required: true })} />
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
                                            <select className="form-control" {...register("ticket_source", { required: true })}>
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
                                <div className="row my-5">
                                    <div className="col-lg-3">
                                        <FormGroup label="Agent Name">
                                            <input type="text" {...register("user_create", { required: true })} className="form-control form-control-md" readOnly />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="Priority Scale">
                                            <select {...register("priority_scale", { required: true })} className="form-control form-control-md">
                                                <option value="">-- select priority scale --</option>
                                                <option value="High"> High</option>
                                                <option value="Medium"> Medium</option>
                                                <option value="Low"> Low</option>
                                            </select>
                                            {errors.priority_scale && <span className="form-text text-danger">Please select priority</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="Type Customer">
                                            <select {...register("type_customer", { required: true })} className="form-control form-control-md " >
                                                <option value="">-- select type --</option>
                                                <option value="Personal">Personal</option>
                                                <option value="Company">Company</option>
                                                <option value="VIP">VIP</option>
                                                <option value="Non-VIP">Non-VIP</option>
                                            </select>
                                            {errors.type_customer && <span className="form-text text-danger">Please select type customer</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="Source Information">
                                            <select {...register("source_information", { required: true })} className="form-control form-control-md">
                                                <option value="">-- select source --</option>
                                                <option value="Call"> Call</option>
                                                <option value="E-mail"> E-mail</option>
                                            </select>
                                            {errors.source_information && <span className="form-text text-danger">Please select source</span>}
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-lg-3">
                                        <FormGroup label="Category">
                                            <select
                                                {...register("category_id", { required: true })}
                                                className="form-control form-control-md"
                                                onChange={(e) => dispatch(apiSubCategoryLv1({ category_id: e.target.value }))}
                                            >
                                                <option value="">-- select category --</option>
                                                {
                                                    category.map((item) => {
                                                        return <option value={item.category_id} key={item.category_id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                            {errors.category_id && <span className="form-text text-danger">Please select category</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="SubCategory Product">
                                            <select
                                                {...register("category_sublv1_id", { required: true })}
                                                className="form-control form-control-md"
                                                onChange={(e) => dispatch(apiSubCategoryLv2({ category_sublv1_id: e.target.value }))}
                                            >
                                                <option value="">-- select subcategory product --</option>
                                                {
                                                    category_sublv1?.map((item) => {
                                                        return <option value={item.category_sublv1_id} key={item.category_sublv1_id}>{item.sub_name}</option>
                                                    })
                                                }
                                            </select>
                                            {errors.category_sublv1_id && <span className="form-text text-danger">Please select subcategory product</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="SubCategory Case">
                                            <select
                                                {...register("category_sublv2_id", { required: true })}
                                                className="form-control form-control-md"
                                                onChange={(e) => dispatch(apiSubCategoryLv3({ category_sublv2_id: e.target.value }))}
                                            >
                                                <option value="">-- select subcategory case --</option>
                                                {
                                                    category_sublv2?.map((item) => {
                                                        return <option value={item.category_sublv2_id} key={item.category_sublv2_id}>{item.sub_name}</option>
                                                    })
                                                }
                                            </select>
                                            {errors.category_sublv2_id && <span className="form-text text-danger">Please select subcategory case</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="SubCategory Detail">
                                            <select
                                                {...register("category_sublv3_id", { required: true })}
                                                className="form-control form-control-md"
                                                onChange={(e) => dispatch(apiSubCategoryLv3Show({ category_sublv3_id: e.target.value }))}
                                            >
                                                <option value="">-- select subcategory detail --</option>
                                                {
                                                    category_sublv3?.map((item) => {
                                                        return <option value={item.category_sublv3_id} key={item.category_sublv3_id}>{item.sub_name}</option>
                                                    })
                                                }
                                            </select>
                                            {errors.category_sublv3_id && <span className="form-text text-danger">Please select subcategory detail</span>}
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-lg-6">
                                        <FormGroup label="Complaint">
                                            <textarea {...register("complaint_detail", { required: true })} className="form-control form-control-md" cols="10" rows="4"></textarea>
                                            {errors.complaint_detail && <span className="form-text text-danger">Please enter complaint</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup label="Response">
                                            <textarea {...register("response_detail", { required: true })} className="form-control form-control-md" cols="10" rows="4"></textarea>
                                            {errors.response_detail && <span className="form-text text-danger">Please enter response</span>}
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-lg-3">
                                        <FormGroup label="Type Complaint">
                                            <select {...register("type_complaint", { required: true })} className="form-control form-control-md ">
                                                <option value="">-- select type --</option>
                                                <option data-icon="fa fa-edit text-primary" value="Written"> Written</option>
                                                <option data-icon="fa fa-microphone text-primary" value="Verbal"> Verbal</option>
                                            </select>
                                            {errors.type_complaint && <span className="form-text text-danger">Please select type</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="Ticket Status">
                                            <select className="form-control form-control-md" {...register("status", { required: true })}>
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
                                        <FormGroup label="Escalation Unit">
                                            <select {...register("org_id", { required: true })} className="form-control form-control-md">
                                                <option value="">-- select Escalation --</option>
                                                <option value="1">Finance</option>
                                                <option value="2">Technical</option>
                                                <option value="3">Human Resource</option>
                                                <option value="4">Marketing</option>
                                            </select>
                                            {errors.org_id && <span className="form-text text-danger">Please select Escalation</span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup label="SLA (Days)">
                                            <input type="number" {...register("sla", { required: true })} className="form-control form-control-md" readOnly />
                                            {errors.sla && <span className="form-text text-danger">Please enter SLA</span>}
                                        </FormGroup>
                                    </div>
                                </div>

                                <ModalFooter>
                                    <button onClick={() => onSubmitPublish()} type="button" className="btn btn-info font-weight-bolder btn-sm m-1">
                                        <Icons iconName="flag" className="svg-icon svg-icon-sm" />
                                        Publish
                                    </button>
                                    <ButtonSubmit />
                                </ModalFooter>
                            </form>
                            <TicketPublish customer={customer} />
                        </div>
                        <div className="tab-pane fade" id="contentInteractionTicket" role="tabpanel" aria-labelledby="tabInteractionTicket">
                            <TicketInteraction />
                        </div>
                        <div className="tab-pane fade" id="contentEscalationTicket" role="tabpanel" aria-labelledby="tabEscalationTicket">
                            <TicketEscalation />
                        </div>
                        <div className="tab-pane fade" id="contentAttachmentTicket" role="tabpanel" aria-labelledby="tabAttachmentTicket">
                            <TicketAttachment />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default TicketCreateModal
