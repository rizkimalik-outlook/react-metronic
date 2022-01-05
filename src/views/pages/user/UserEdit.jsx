import React, { useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserResetPassword from './UserResetPassword';
import { useGetUsersQuery, useUpdateUserMutation } from 'app/services/apiUser';
// import SplashScreen from 'views/components/SplashScreen';
import { useSelector } from 'react-redux';
import { authUser } from 'app/slice/sliceAuth';
import { baseUrl } from 'app/config';
import { useGetUserLevelQuery } from 'app/services/apiUserLevel';


function UserEdit() {
    let { id } = useParams();
    const history = useHistory();
    const { token } = useSelector(authUser);
    const { data, isFetching} = useGetUserLevelQuery();
    const { refetch } = useGetUsersQuery();
    // const { data, isFetching } = useGetUserShowQuery(id);
    const [updateUser] = useUpdateUserMutation();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
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
                console.log(json.data)
                const { 
                    name,
                    username,
                    email_address,
                    password,
                    user_level,
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
    }, [id, reset, token]);

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
                                        {isFetching && <div>loading..</div>}
                                        {
                                            data?.data.map((item)=>{
                                                return <option value={item.level_name} key={item.id}>{item.level_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.user_level && <span className="form-text text-danger">Please enter User Level</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Organization:</label>
                                    <select className="form-control" {...register("organization")}>
                                        <option>-- User Organization --</option>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Agent">Agent</option>
                                    </select>
                                    {errors.user_level && <span className="form-text text-danger">Please enter User Level</span>}
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
                            <NavLink to="/user" className="btn btn-sm btn-secondary mx-1">Cancel</NavLink>
                            <button type="submit" className="btn btn-sm btn-primary font-weight-bold mx-1">Save changes</button>
                        </CardFooter>
                    </form>
                </Card>

                <UserResetPassword userid={id} />
            </Container>
        </MainContent>
    )
}

export default UserEdit
