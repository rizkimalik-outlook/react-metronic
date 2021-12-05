import React, { useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'components/card';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserEdit() {
    let { id } = useParams();
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        async function getShowUser() {
            try {
                const res = await axios.get(`/user/show/${id}`)
                const { name, username, email_address, user_level, max_concurrent } = res.data[0];
                reset({
                    id:id,
                    name,
                    username,
                    email_address,
                    user_level,
                    max_concurrent
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        getShowUser();
    }, [id,reset])


    const onSubmitUpdateUser = async (data) => {
        try {
            // const data_post = JSON.stringify(data);
            const res = await axios.put('/user/update', data);

            if (res.status === 200) {
                Swal.fire({
                    title: "Update Success.",
                    text: "Success user data!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
                history.push('/user')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="User Edit" menu_name="Management User" modul_name="User Edit" />

            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Update User" />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitUpdateUser)} className="form">
                        <CardBody>
                            <input type="hidden" {...register("id")} />
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter full name" {...register("name", { required: true, maxLength: 100 })}  />
                                    {errors.name && <span className="form-text text-danger">Please enter your full name</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter email" {...register("email_address", { required: true, pattern: /^\S+@\S+$/i })} />
                                    {errors.email_address && <span className="form-text text-danger">Please enter your email</span>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Username:</label>
                                    <input type="text" {...register("username", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter username" />
                                    {errors.username && <span className="form-text text-danger">Please enter your username</span>}
                                </div>
                                {/* <div className="col-lg-6">
                                    <label>Password:</label>
                                    <input type="password" name="password" defaultValue={fields.password} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter password" />
                                    <span className="form-text text-danger">Please enter your password</span>
                                </div> */}
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>User Level:</label>
                                    <select className="form-control" {...register("user_level", { required: true })}>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Agent">Agent</option>
                                    </select>
                                    {errors.user_level && <span className="form-text text-danger">Please enter User Level</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Max Concurrent:</label>
                                    <input type="number" {...register("max_concurrent")} className="form-control" placeholder="Enter Max Concurrent" />
                                </div>
                            </div>
                            <div className="separator separator-dashed my-5" />
                            <div className="form-group">
                                <label>Agent Handle:</label>
                                <div className="checkbox-list">
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <span />Email</label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <span />Sosial Media</label>
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <span />Phone</label>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <NavLink to="/user" className="btn btn-sm btn-secondary mx-1">Close</NavLink>
                            <button type="submit" className="btn btn-sm btn-primary font-weight-bold mx-1">Save changes</button>
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserEdit
