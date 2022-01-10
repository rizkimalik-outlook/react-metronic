import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { useDispatch } from 'react-redux'
import { apiCustomerUpdate, apiCustomerShow } from 'app/services/apiCustomer'
import { ButtonCancel, ButtonSubmit } from 'views/components/button';

const CustomerEdit = () => {
    const history = useHistory();
    let { customer_id } = useParams();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        async function getShowCustomer() {
            try {
                const { payload } = await dispatch(apiCustomerShow({ customer_id }))
                if (payload.status === 200) {
                    const {
                        customer_id,
                        name,
                        email,
                        no_ktp,
                        birth,
                        gender,
                        telephone,
                        address
                    } = payload.data[0];
                    reset({
                        customer_id,
                        name,
                        email,
                        no_ktp,
                        birth: birth?.slice(0, 10),
                        gender,
                        telephone,
                        address
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getShowCustomer();
    }, [customer_id, reset, dispatch]);

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
                history.push('/customer')
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
        <MainContent>
            <SubHeader active_page="Customer Edit" menu_name="Customer" modul_name="Customer Edit" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Edit Customer" subtitle="Form add Edit customer." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitUpdateCustomer)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>CustomerID:</label>
                                    <input type="text" {...register("customer_id", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter full name" readOnly />
                                </div>
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" {...register("name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter full name" />
                                    {errors.name && <span className="form-text text-danger">Please enter full name</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Email:</label>
                                    <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="form-control" placeholder="Enter email" />
                                    {errors.email && <span className="form-text text-danger">Please enter email</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Phone Number:</label>
                                    <input type="number" {...register("telephone", { required: true, pattern: /^[0-9]+$/i })} className="form-control" placeholder="Enter phone" />
                                    {errors.telephone && <span className="form-text text-danger">Please enter phone</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Gender:</label>
                                    <select className="form-control" {...register("gender", { required: true })}>
                                        <option value="">-- select gender--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <span className="form-text text-danger">Select enter gender</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Date of Birth:</label>
                                    <input type="date" {...register("birth")} className="form-control" placeholder="Enter birth" />
                                    {errors.birth && <span className="form-text text-danger">Please enter birth</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>NIK:</label>
                                    <input type="number" {...register("no_ktp", { pattern: /^[0-9]+$/i })} className="form-control" placeholder="Enter NIK" />
                                    {errors.no_ktp && <span className="form-text text-danger">Please enter NIK</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Address:</label>
                                    <textarea {...register("address")} className="form-control" cols="30" rows="3"></textarea>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonCancel to="/customer" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CustomerEdit
