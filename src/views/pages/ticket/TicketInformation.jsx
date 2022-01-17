import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Column, DataGrid, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid'

import Icons from 'views/components/Icons'
import FormGroup from 'views/components/FormGroup'
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card'
import { ButtonSubmit } from 'views/components/button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'views/components/modal'
import { apiCustomerList, apiCustomerUpdate } from 'app/services/apiCustomer'
import { setSelectedCustomer } from 'app/slice/sliceTicket';

const TicketInformation = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const customer = useSelector(state => state.ticket.selected_customer);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    useEffect(() => {
        async function getShowCustomer() {
            const {
                customer_id,
                name,
                email,
                no_ktp,
                birth,
                gender,
                telephone,
                address
            } = customer;

            reset({
                customer_id,
                name,
                email,
                no_ktp,
                birth:birth?.slice(0, 10),
                gender,
                telephone,
                address
            });
        }
        getShowCustomer();
    }, [customer, reset, dispatch]);

    const onSubmitUpdateCustomer = async (data) => {
        try {
            const { payload } = await dispatch(apiCustomerUpdate(data))
            if (payload.status === 200) {
                Swal.fire({
                    title: "Update Success.",
                    text: "Success update data customer!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
            }
            else if (payload.status === 201) {
                Swal.fire({
                    title: "Already Exists.",
                    text: payload.data,
                    buttonsStyling: false,
                    icon: "warning",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle title="Ticket Information" subtitle="Data Customer Profile." />
                <CardToolbar>
                    <button onClick={(e) => setShowModal(true)} className="btn btn-icon btn-sm btn-light-primary btn-circle" title="Search Customer" data-toggle="modal" data-target="#modalListCustomer">
                        <Icons iconName="search" className="svg-icon svg-icon-sm" />
                    </button>
                </CardToolbar>
            </CardHeader>
            <CardBody className="p-4">
                <form onSubmit={handleSubmit(onSubmitUpdateCustomer)}>
                    <FormGroup label="CustomerID" formText="Identity customer id">
                        <input type="text" className="form-control form-control-sm" {...register("customer_id", { required: true })} readOnly />
                        {errors.customer_id && <span className="form-text text-danger">Please enter CustomerID</span>}
                    </FormGroup>
                    <FormGroup label="Full Name">
                        <input type="text" className="form-control form-control-sm" {...register("name", { required: true, maxLength: 100 })} />
                        {errors.name && <span className="form-text text-danger">Please enter name</span>}
                    </FormGroup>
                    <FormGroup label="Phone Number">
                        <input type="text" className="form-control form-control-sm" {...register("telephone", { required: true, pattern: /^[0-9]+$/i })} />
                        {errors.telephone && <span className="form-text text-danger">Please enter phone number</span>}
                    </FormGroup>
                    <FormGroup label="Email">
                        <input type="text" className="form-control form-control-sm" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors.email && <span className="form-text text-danger">Please enter email</span>}
                    </FormGroup>
                    <FormGroup label="NIK">
                        <input type="text" className="form-control form-control-sm" {...register("no_ktp", { maxLength: 100 })} />
                    </FormGroup>
                    <FormGroup label="Gender">
                        <select className="form-control" {...register("gender", { required: true })}>
                            <option value="">-- select gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <span className="form-text text-danger">Please select gender</span>}
                    </FormGroup>
                    <FormGroup label="Date of birth">
                        <input type="date" className="form-control form-control-sm" {...register("birth", { maxLength: 10 })} />
                    </FormGroup>
                    <FormGroup label="Address">
                        <textarea {...register("address")} className="form-control form-control-sm" cols="10" rows="4"></textarea>
                    </FormGroup>

                    <div className="d-flex justify-content-between py-4">
                        <button type="button" className="btn btn-info btn-sm m-1">
                            <Icons iconName="route" className="svg-icon svg-icon-sm" />
                            Journey
                        </button>
                        <ButtonSubmit />
                    </div>
                </form>

                {showModal && <ModalListCustomer />}
            </CardBody>
        </Card>
    )
}

export const ModalListCustomer = () => {
    const dispatch = useDispatch();
    const { customers } = useSelector(state => state.customer);

    useEffect(() => {
        dispatch(apiCustomerList())
    }, [dispatch]);

    function componentButtonActions(data) {
        const customer = data.row.data;
        return (
            <div className="d-flex align-items-end justify-content-center">
                <button
                    type="button"
                    className="btn btn-sm btn-light-primary py-1 px-2"
                    data-dismiss="modal"
                    onClick={(e) => dispatch(setSelectedCustomer(customer))}
                >
                    {data.value}
                </button>
            </div>
        )
    }

    return (
        <Modal id="modalListCustomer">
            <ModalHeader title="Customer List" />
            <ModalBody>
                <DataGrid
                    dataSource={customers}
                    keyExpr="id"
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showBorders={true}
                    showColumnLines={true}
                    showRowLines={true}
                >
                    <HeaderFilter visible={true} />
                    <FilterRow visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                        visible={true}
                        displayMode='full'
                        showInfo={true}
                        showNavigationButtons={true} />
                    {/* <Column caption="Actions" dataField="id" width={100} cellRender={componentButtonActions} /> */}
                    <Column caption="CustomerID" dataField="customer_id" cellRender={componentButtonActions} />
                    <Column caption="Name" dataField="name" />
                    <Column caption="Email" dataField="email" />
                    <Column caption="Phone Number" dataField="telephone" />
                    <Column caption="NIK" dataField="no_ktp" />
                    <Column caption="Address" dataField="address" />
                    <Column caption="Status" dataField="status" cellRender={(data) => {
                        return <span className={`label label-md label-light-${data.value === 'Registered' ? 'success' : 'warning'} label-inline`}>{data.value}</span>
                    }} />
                </DataGrid>
            </ModalBody>
            <ModalFooter />
        </Modal>
    )
}

export default TicketInformation
