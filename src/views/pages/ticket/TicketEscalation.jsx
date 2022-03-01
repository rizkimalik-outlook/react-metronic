import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ButtonSubmit } from 'views/components/button';
import FormGroup from 'views/components/FormGroup';
import { apiDepartment } from 'app/services/apiMasterData';
import { authUser } from 'app/slice/sliceAuth';
import { apiEscalation, apiTicketShow } from 'app/services/apiTicket';

const layers = [{
    "name": "Layer 1",
    "value": "1"
}, {
    "name": "Layer 2",
    "value": "2"
}, {
    "name": "Layer 3",
    "value": "3"
}];

const TicketEscalation = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const { username, user_level } = useSelector(authUser)
    const { departments } = useSelector(state => state.master);
    const { ticket } = useSelector(state => state.ticket);

    useEffect(() => {
        dispatch(apiDepartment())
        setValue('department_id', ticket.department_id)
    }, [dispatch, setValue, ticket]);

    const onSubmitEscalation = async (data) => {
        try {
            //? push data field
            data.user_create = username;
            data.ticket_number = ticket.ticket_number;
            data.status = ticket.status;
            data.ticket_source = ticket.ticket_source;

            const { payload } = await dispatch(apiEscalation(data))
            if (payload.status === 200) {
                Swal.fire({
                    title: "Escalation Ticket.",
                    text: "Success escalation ticket!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
                dispatch(apiTicketShow({ ticket_number: ticket.ticket_number }))
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="border rounded p-4 my-2">
            <div className="d-flex justify-content-between mb-5">
                <h4>Escalation Ticket </h4>
            </div>
            {
                ticket.status === 'Closed' || ticket.ticket_position !== user_level.substring(user_level.length - 1) ? (
                    <div className="alert alert-custom alert-notice alert-light-primary fade show" role="alert">
                        <div className="alert-icon"><i className="flaticon-info" /></div>
                        <div className="alert-text">Ticket Number <b>{ticket.ticket_number}</b> has been escalation.</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmitEscalation)}>
                        <div className="row">
                            <div className="col-lg-6">
                                <FormGroup label="Escalation Unit">
                                    <select className="form-control" {...register("department_id", { required: true })}>
                                        <option value="">-- select escalation --</option>
                                        {
                                            departments.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.department_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.department_id && <span className="form-text text-danger">Please select escalation</span>}
                                </FormGroup>
                            </div>
                            <div className="col-lg-6">
                                <FormGroup label="Layer">
                                    <select className="form-control" {...register("ticket_position", { required: true })}>
                                        <option value="">-- select layer --</option>
                                        {
                                            layers
                                                .filter((item) => item.value !== user_level.substring(user_level.length - 1))
                                                .map((layer, index) => {
                                                    return <option value={layer.value} key={index} >{layer.name}</option>
                                                })
                                        }
                                    </select>
                                    {errors.ticket_position && <span className="form-text text-danger">Please select layer</span>}
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup label="Response">
                            <textarea {...register("response_detail", { required: true })} className="form-control form-control-sm" cols="10" rows="4" placeholder="response detail"></textarea>
                            {errors.response_detail && <span className="form-text text-danger">Please enter response.</span>}
                        </FormGroup>
                        <div className="d-flex justify-content-end py-4">
                            <ButtonSubmit />
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default TicketEscalation;
