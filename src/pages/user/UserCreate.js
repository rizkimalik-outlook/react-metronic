import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'components/card';

function UserCreate() {
    const history = useHistory();
    const [fields, setFields] = useState({
        name: '',
        username: '',
        password: '',
        email_address: '',
        user_level: 'Agent',
        max_concurrent: 0
    });

    const onHandleChange = (event) => {
        const name = event.target.name;
        setFields({
            ...fields,
            [name]: event.target.value
        });
    };

    const onSubmitCreateUser = async (e) => {
        e.preventDefault();

        try {
            const data_post = JSON.stringify(fields);
            const res = await axios.post('/user/store', data_post, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const data = res.data;
            console.log(res);

            if (res.status === 200) {
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
                        <CardTitle title="Create New User" />
                    </CardHeader>
                    <form onSubmit={onSubmitCreateUser} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" name="name" value={fields.name} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter full name" />
                                    <span className="form-text text-muted">Please enter your full name</span>
                                </div>
                                <div className="col-lg-6">
                                    <label>Email:</label>
                                    <input type="email" name="email_address" value={fields.email_address} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter email" />
                                    <span className="form-text text-muted">Please enter your email</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Username:</label>
                                    <input type="text" name="username" value={fields.username} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter username" />
                                    <span className="form-text text-muted">Please enter your username</span>
                                </div>
                                <div className="col-lg-6">
                                    <label>Password:</label>
                                    <input type="password" name="password" value={fields.password} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter password" />
                                    <span className="form-text text-muted">Please enter your password</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>User Level:</label>
                                    <input type="text" name="user_level" value={fields.user_level} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter User Level" disabled />
                                    <span className="form-text text-muted">Please enter User Level</span>
                                </div>
                                <div className="col-lg-6">
                                    <label>Max Concurrent:</label>
                                    <input type="number" name="max_concurrent" value={fields.max_concurrent} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter Max Concurrent" />
                                    <span className="form-text text-muted">Please enter Max Concurrent</span>
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

export default UserCreate
