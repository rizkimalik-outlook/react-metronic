import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import { ButtonSubmit } from 'views/components/button'
import FormGroup from 'views/components/FormGroup'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'views/components/modal'
import { authUser } from 'app/slice/sliceAuth'
import { apiMasterChannel, apiMasterStatus } from 'app/services/apiMasterData'
import { apiHistoryTransaction, apiTicketStore } from 'app/services/apiTicket'
import {
    apiCategoryList,
    apiSubCategoryLv1,
    apiSubCategoryLv2,
    apiSubCategoryLv3,
    apiSubCategoryLv3Show
} from 'app/services/apiCategory';

const TicketCreateModal = ({ customer }) => {
    const dispatch = useDispatch();
    const { username } = useSelector(authUser)
    const { channels, status } = useSelector(state => state.master);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const {
        category,
        category_sublv1,
        category_sublv2,
        category_sublv3,
        category_sublv3_detail,
    } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(apiMasterChannel())
        dispatch(apiMasterStatus())
        dispatch(apiCategoryList())

        const { sla, org_id } = category_sublv3_detail;
        reset({
            user_create: username,
            sla: sla,
            org_id: org_id
        })
    }, [dispatch, reset, username, category_sublv3_detail]);

    const onSubmitCreateTicket = async (data) => {
        try {
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
                dispatch(apiHistoryTransaction({ customer_id: data.customer_id }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onLoadCategorySubLv1 = async (data) => {
        const category_id = data.target.value;
        dispatch(apiSubCategoryLv1({ category_id }))
    }

    const onLoadCategorySubLv2 = async (data) => {
        const category_sublv1_id = data.target.value;
        dispatch(apiSubCategoryLv2({ category_sublv1_id }))
    }

    const onLoadCategorySubLv3 = async (data) => {
        const category_sublv2_id = data.target.value;
        dispatch(apiSubCategoryLv3({ category_sublv2_id }))
    }
    const onGetSLA = async (data) => {
        const category_sublv3_id = data.target.value;
        dispatch(apiSubCategoryLv3Show({ category_sublv3_id }))
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
                                    <i className="flaticon2-chat-1" />
                                </span>
                                <span className="nav-text">Form Create Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabInteractionTicket" data-toggle="tab" href="#contentInteractionTicket" aria-controls="contentInteractionTicket">
                                <span className="nav-icon">
                                    <i className="flaticon2-layers-1" />
                                </span>
                                <span className="nav-text">Interaction Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabEscalationTicket" data-toggle="tab" href="#contentEscalationTicket" aria-controls="contentEscalationTicket">
                                <span className="nav-icon">
                                    <i className="flaticon2-rocket-1" />
                                </span>
                                <span className="nav-text">Escalation Ticket</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tabAttachmentTicket" data-toggle="tab" href="#contentAttachmentTicket" aria-controls="contentAttachmentTicket">
                                <span className="nav-icon">
                                    <i className="flaticon2-rocket-1" />
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
                                <hr />

                                <div className="row">
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
                                <div className="row">
                                    <div className="col-lg-3">
                                        <FormGroup label="Category">
                                            <select {...register("category_id", { required: true })} onChange={onLoadCategorySubLv1} className="form-control form-control-md ">
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
                                            <select {...register("category_sublv1_id", { required: true })} onChange={onLoadCategorySubLv2} className="form-control form-control-md ">
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
                                            <select {...register("category_sublv2_id", { required: true })} onChange={onLoadCategorySubLv3} className="form-control form-control-md ">
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
                                            <select {...register("category_sublv3_id", { required: true })} onChange={onGetSLA} className="form-control form-control-md ">
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
                                    <ButtonSubmit />
                                </ModalFooter>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="contentInteractionTicket" role="tabpanel" aria-labelledby="tabInteractionTicket">Tab content 2</div>
                        <div className="tab-pane fade" id="contentEscalationTicket" role="tabpanel" aria-labelledby="tabEscalationTicket">Tab content 3</div>
                        <div className="tab-pane fade" id="contentAttachmentTicket" role="tabpanel" aria-labelledby="tabAttachmentTicket">Tab content 3</div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default TicketCreateModal
