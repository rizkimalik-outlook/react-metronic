import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { AuthUser, SocketIO, socket } from "../store";
import { useHistory } from 'react-router';

function Login() {
    const history = useHistory()
    const setGlobalSocketIO = useSetRecoilState(SocketIO);
    const setAuthUser = useSetRecoilState(AuthUser);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [fields, setFields] = useState({
        username: '',
        password: '',
        remember: ''
    });

    const onHandleChange = (event) => {
        const name = event.target.name;

        setFields({
            ...fields,
            [name]: event.target.value
        });
        setErrorUsername(false);
        setErrorPassword(false);
    };

    /* const onConnected = () => {
        socket.on('connect', function () {
            const data = {
                "id": socket.id,
                "connected": socket.connected
            }

            // socket.emit('join', socket.id);
            setGlobalSocketIO(data);
        });
    }
    onConnected(); */

    useEffect(() => {
        socket.on('connect', function () {
            const data = {
                "id": socket.id,
                "connected": socket.connected
            }
            // socket.emit('join', socket.id);
            setGlobalSocketIO(data);
        });
    }, [])


    const authLogin = async (e) => {
        e.preventDefault();

        try {
            const json = JSON.stringify(fields);
            const res = await axios.post('/login', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = res.data;

            if (res.status == 200) {
                setAuthUser(data);
                history.push("/dashboard")
            }
        }
        catch (error) {
            if (error.response) {
                // console.log(error.response.status);
                // console.log(error.response.headers);
                const data = error.response.data;
                if (data.value == 'username') {
                    setErrorUsername(true);
                }
                else if (data.value == 'password') {
                    setErrorPassword(true);
                }

            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }


    return (
        <div className="card card-custom gutter-b card-border" id="kt_blockui_card">
            <div className="card-body">
                <div className="mb-10">
                    <h3>Sign In to Mendawai</h3>
                    <div className="text-muted font-weight-bold">Enter your details to login to your account:</div>
                </div>

                <form onSubmit={authLogin} className="form">
                    <div className="form-group validated">
                        <label>Username / Email</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="la la-user" />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={fields.username}
                                className={errorUsername ? 'form-control form-control-lg is-invalid' : 'form-control form-control-lg'}
                                autoComplete="username"
                                placeholder="Username"
                                required={true}
                                onChange={onHandleChange}
                                autoFocus={true}
                            />
                        </div>
                        {errorUsername && <div className="invalid-feedback">*Username Invalid!</div>}
                    </div>

                    <div className="form-group validated mt-4">
                        <label>Password</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="la la-key" />
                                </span>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={fields.password}
                                className={errorPassword ? 'form-control form-control-lg is-invalid' : 'form-control form-control-lg'}
                                autoComplete="current-password"
                                placeholder="Password"
                                required={true}
                                onChange={onHandleChange}
                            />
                        </div>
                        {errorPassword && <div className="invalid-feedback">*Password Invalid!</div>}
                    </div>

                    <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <div className="checkbox-inline">
                            <label className="checkbox m-0 text-muted">
                                <input type="checkbox" name="remember" />
                                <span />Remember me
                            </label>
                        </div>

                        {/* <Link href={route('register')} className="btn btn-link">
                            Register
                        </Link> */}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Sign In
                        </button>
                    </div>

                </form>

                {/* <ValidationErrors errors={errors} /> */}

            </div>
        </div>
    )
}

export default Login
