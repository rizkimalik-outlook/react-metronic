import React, { useState } from 'react'
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { AuthUser, SocketIO, socket } from "../store";
import { useHistory } from 'react-router-dom';
import Icons from 'components/Icons';

function Login() {
    let history = useHistory()
    const setGlobalSocketIO = useSetRecoilState(SocketIO);
    const setAuthUser = useSetRecoilState(AuthUser);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [loading, setLoading] = useState('');
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
        setLoading('');
    };

    function onConnected() {
        socket.auth = { username: fields.username };
        socket.on('connect', function () {
            const data = {
                "id": socket.id,
                "connected": socket.connected
            }
            setGlobalSocketIO(data);
        });
    }
    onConnected();

    const authLogin = async (e) => {
        e.preventDefault();
        setLoading('spinner spinner-white spinner-left')

        try {
            const json = JSON.stringify(fields);
            const res = await axios.post('/auth/login', json);
            const data = res.data;

            if (res.status === 200) {
                setLoading('');
                setAuthUser(data);
                history.push("/todolist");
                window.location.reload();
            }
        }
        catch (error) {
            if (error.response) {
                // console.log(error.response.status);
                // console.log(error.response.headers);
                const data = error.response.data;
                if (data.value === 'username') {
                    setErrorUsername(true);
                }
                else if (data.value === 'password') {
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
                                    <Icons iconName="user" className="svg-icon svg-icon-primary svg-icon-sm" />
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
                                    <Icons iconName="key" className="svg-icon svg-icon-primary svg-icon-sm" />
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
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <button type="submit" className={`btn btn-lg btn-primary btn-block ${loading}`}>
                            Sign In
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
