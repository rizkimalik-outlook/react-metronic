import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateUser({ stateChange, ...rest}) {
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
            const json = JSON.stringify(fields);
            const res = await axios.post('/user/store', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const data = res.data;
            // console.log(data);

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
                stateChange(key => key +1)
                // e.refs.form.reset();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal fade" id="modalCreateUser" tabIndex={-1} role="dialog" aria-labelledby="modalCreateUser" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={onSubmitCreateUser} className="form">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCreateUserLabel">Create New User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i aria-hidden="true" className="ki ki-close" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Full Name:</label>
                                    <input type="text" name="name" value={fields.name} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter full name" />
                                    <span className="form-text text-muted">Please enter your full name</span>
                                </div>
                                <div className="col-lg-6">
                                    <label>Email:</label>
                                    <input type="email" name="email_address" value={fields.email} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter email" />
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
                                    <input type="text" name="user_level" value={fields.user_level} required={true} onChange={onHandleChange} className="form-control" placeholder="Enter User Level" />
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-light-primary font-weight-bold" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-sm btn-primary font-weight-bold">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser
