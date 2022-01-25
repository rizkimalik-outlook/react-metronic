import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { useGetUsersQuery, useCreateUserMutation } from 'app/services/apiUser';
import { apiMasterUserLevel } from 'app/services/apiMasterData';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiOrganizationList } from 'app/services/apiOrganization';

function UserCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user_level, organizations } = useSelector(state => state.master)
    const { refetch } = useGetUsersQuery();
    const [createUser] = useCreateUserMutation();
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        dispatch(apiMasterUserLevel())
        dispatch(apiOrganizationList())
    }, [dispatch]);

    const onSubmitCreateUser = async (data) => {
        try {
            const res = await createUser(data);
            if (res.data.status === 200) {
                refetch();
                Swal.fire({
                    title: "Insert Success.",
                    text: "Success into application!",
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
            <SubHeader active_page="User Create" menu_name="Management User" modul_name="User Create" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Create New User" subtitle="Form add new user login application." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitCreateUser)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" {...register("name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter full name" />
                                    {errors.name && <span className="form-text text-danger">Please enter your full name</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Email:</label>
                                    <input type="email" {...register("email_address", { required: true, pattern: /^\S+@\S+$/i })} className="form-control" placeholder="Enter email" />
                                    {errors.email_address && <span className="form-text text-danger">Please enter your email</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Username:</label>
                                    <input type="text" {...register("username", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter username" />
                                    {errors.username && <span className="form-text text-danger">Please enter your username</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Password:</label>
                                    <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Enter password" />
                                    {errors.password && <span className="form-text text-muted">Please enter your password</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>User Level:</label>
                                    <select className="form-control" {...register("user_level", { required: true })}>
                                        <option value="">-- User Level --</option>
                                        {
                                            user_level?.map((item) => {
                                                return <option value={item.level_name} key={item.id}>{item.level_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.user_level && <span className="form-text text-danger">Please enter User Level</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Organization:</label>
                                    <select className="form-control" {...register("organization", { required: true })}>
                                        <option value="">-- User Organization --</option>
                                        {
                                            organizations.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.organization_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.organization && <span className="form-text text-danger">Please select Organization</span>}
                                </div>

                            </div>
                            <div className="separator separator-dashed my-5" />
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Channel Handle:</label>
                                </div>
                                <div className="col-lg-4">
                                    <div className="checkbox-list">
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("inbound")} /><span />Inbound
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("outbound")} /><span />Outbound
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox"{...register("sms")} /><span />SMS
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="checkbox-list">
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("email")} /><span />Email
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("chat")} /><span />Chat
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("facebook")} /><span />Facebook
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="checkbox-list">
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("twitter")} /><span />Twitter
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("instagram")} /><span />Instagram
                                        </label>
                                        <label className="checkbox">
                                            <input type="checkbox" {...register("whatsapp")} /><span />Whatsapp
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div className="separator separator-dashed my-5" />
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label>Max Inbound:</label>
                                    <input type="number" {...register("max_inbound", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max Outbound:</label>
                                    <input type="number" {...register("max_outbound", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max SMS:</label>
                                    <input type="number" {...register("max_sms", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label>Max Email:</label>
                                    <input type="number" {...register("max_email", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max Chat:</label>
                                    <input type="number" {...register("max_chat", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max Facebook:</label>
                                    <input type="number" {...register("max_facebook", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label>Max Twitter:</label>
                                    <input type="number" {...register("max_twitter", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max Instagram:</label>
                                    <input type="number" {...register("max_instagram", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                                <div className="col-lg-4">
                                    <label>Max Whatsapp:</label>
                                    <input type="number" {...register("max_whatsapp", { pattern: /^[0-9]+$/i })} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Max Queue:</label>
                                    <input type="number" {...register("max_queue", { pattern: /^[0-9]+$/i })} className="form-control" placeholder="Enter Max Concurrent" />
                                </div>
                                <div className="col-lg-6">
                                    <label>Max Concurrent:</label>
                                    <input type="number" {...register("max_concurrent", { pattern: /^[0-9]+$/i })} className="form-control" placeholder="Enter Max Concurrent" />
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonCancel to="/user" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserCreate
