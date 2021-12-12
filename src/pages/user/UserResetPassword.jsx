import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function UserResetPassword({ userid }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [match,setMatch] = useState(true)

    const onSubmitResetPassword = async (data) => {
        try {
            if (data.new_password === data.password) {
                setMatch(true)
                const res = await axios.put('/user/reset_password', data);
                if (res.status === 200) {
                    Swal.fire({
                        title: "Update Success.",
                        text: "Success reset password!",
                        buttonsStyling: false,
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        },
                        timer: 1500
                    });
                }
            }
            else{
                setMatch(false)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal fade" id="modalResetPassword" tabIndex={-1} role="dialog" aria-labelledby="modalResetPassword" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onSubmitResetPassword)}>
                        <input type="hidden" value={userid} {...register("id")} />
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalResetPasswordLabel">Reset Password</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i aria-hidden="true" className="ki ki-close" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>New Password:</label>
                                    <input type="password" {...register("new_password", { required: true })} className="form-control" placeholder="New Password" />
                                    {errors.new_password && <span className="form-text text-danger">Please enter your password</span>}
                                </div>
                                <div className="col-lg-12 mt-4">
                                    <label>Confirm Password:</label>
                                    <input type="password" {...register("password", { required: true })} className="form-control" placeholder="Confirm Password" />
                                    {errors.password && <span className="form-text text-danger">Please enter your password</span>}
                                    {match === false && <span className="form-text text-danger">Confirm password does not match</span>}
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer p-2">
                            <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary font-weight-bold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserResetPassword
