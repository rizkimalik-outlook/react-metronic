import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import UserResetPassword from './UserResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from 'app/slice/sliceAuth';
import { baseUrl } from 'app/config';
import { useGetUsersQuery, useUpdateUserMutation } from 'app/services/apiUser';
import { apiMasterUserLevel } from 'app/services/apiMasterData';


function UserEdit() {
    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { user_level } = useSelector(state => state.master)
    const { token } = useSelector(authUser);
    const { refetch } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(apiMasterUserLevel())
        async function getShowUser() {
            try {
                const res = await fetch(`${baseUrl}/user/show/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const json = await res.json();
                const {
                    name,
                    username,
                    email_address,
                    password,
                    user_level,
                    organization,
                    inbound,
                    outbound,
                    sms,
                    email,
                    chat,
                    facebook,
                    twitter,
                    instagram,
                    whatsapp,
                    max_inbound,
                    max_outbound,
                    max_sms,
                    max_email,
                    max_chat,
                    max_facebook,
                    max_twitter,
                    max_instagram,
                    max_whatsapp,
                    max_queue,
                    max_concurrent
                } = json.data[0];

                reset({
                    id: id,
                    name,
                    username,
                    email_address,
                    password,
                    user_level,
                    organization,
                    inbound,
                    outbound,
                    sms,
                    email,
                    chat,
                    facebook,
                    twitter,
                    instagram,
                    whatsapp,
                    max_inbound,
                    max_outbound,
                    max_sms,
                    max_email,
                    max_chat,
                    max_facebook,
                    max_twitter,
                    max_instagram,
                    max_whatsapp,
                    max_queue,
                    max_concurrent
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        getShowUser();
    }, [id, reset, token, dispatch]);

    const onSubmitUpdateUser = async (data) => {
        try {
            const res = await updateUser(data);
            if (res.data.status === 200) {
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
                refetch();
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
                        <CardTitle title="Update User" subtitle="Form update user login." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitUpdateUser)} className="form">
                        <CardBody>
                            <input type="hidden" {...register("id")} />
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter full name" {...register("name", { required: true, maxLength: 100 })} />
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
                                <div className="col-lg-6">
                                    <label>Password:</label><br />
                                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#modalResetPassword">Reset Password</button>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>User Level:</label>
                                    <select className="form-control" {...register("user_level", { required: true })}>
                                        <option>-- User Level --</option>
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
                                        <option value="1">Finance</option>
                                        <option value="2">Technical</option>
                                        <option value="3">Human Resource</option>
                                        <option value="4">Marketing</option>
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
                                            <input type="checkbox" {...register("sms")} /><span />SMS
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

                <UserResetPassword userid={id} />
            </Container>
        </MainContent>
    )
}

export default UserEdit
