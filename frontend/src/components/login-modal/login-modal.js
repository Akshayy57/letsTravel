import React, {useContext, useEffect, useState} from 'react';
import ContextApi from '../../context-api/context-api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Credslogin, CredsRegister } from '../../api-service/api-service';
import { ToastContainer, toast } from 'react-toastify';

const LoginModal = (props) => {

    const { dispatchUserEvent, state } = useContext(ContextApi);
    const history = useHistory();
    const schema = yup.object({
        email: yup.string().required('Please enter Email'),
        password: yup.string().required('Please enter Password'),
        name: state.label === 'register' && yup.string().required('Please enter Name'),
        mobile: state.label === 'register' && yup.string().required('Please enter Mobile Number')
    }).required();
    
    const { register, handleSubmit,  formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    });
    
    const closeModal = () => {
        if( state.login) dispatchUserEvent('LOGIN', { login: false });
        else dispatchUserEvent('REGISTER', { register: false });
    }

    const loginForm = async (data) => {
        console.log(data)
        let response; 
        if (state.label === 'login') {
            response = await Credslogin(data);
            if (response) {
                if (response.status === 200) {
                    dispatchUserEvent('LOGIN', { login: false });
                    localStorage.setItem('user_data', JSON.stringify(response.data));
                    history.push(`${state.path}`);
                    props.handleSnack({ snack: true, message: 'LogIn successfully', class: 'success' });
                    dispatchUserEvent('LOGIN', { login: false });
                } else { 
                    props.handleSnack({ snack: true, message: 'Please SignUp', class: 'error' });    
                }   
            } else {
                props.handleSnack({ snack: true, message: 'Invalid Username & Password', class: 'error' });
            }
        } else {
            response = await CredsRegister(data);
            if (response) {
                if (response.status === 200) {
                    dispatchUserEvent('REGISTER', { register: false });
                    history.push(`${state.path}`);
                    props.handleSnack({ snack: true, message: 'User created successfully', class: 'success' });
                    dispatchUserEvent('REGISTER', { register: false });
                } else { 
                    props.handleSnack({ snack: true, message: 'Error, Kindly login again after sometime.', class: 'error' });
                }   
            }
        }
    }

    
    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className={`modal ${state.login || state.register ? 'd-block' : 'fade'}`} id="exampleModal" backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="text-center my-3 login-title">
                                <h1 className="">Lets Travel</h1>
                                <p>Think for a budget friendly rooms and we are here to make it happen</p>
                            </div>
                            {
                                state.login ?
                                    <form onSubmit={handleSubmit(loginForm)} className="form-login">
                                        <div className="mb-4">
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                placeholder="Enter Email"
                                                aria-describedby="emailHelp"
                                            />
                                            <p className={errors.email && 'log-error'}>{errors.email?.message}</p>
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                {...register("password")}
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Enter Password"
                                            />
                                            <p className={errors.password && 'log-error'}>{errors.password?.message}</p>
                                        </div>
                                        {/* Forgot Password */}
                                        <div>
                                            <a href="#">Forgot Password?</a>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="btn btn-primary btn-login">Log In</button>
                                        </div>
                                    </form>
                                    : 
                                    <form onSubmit={handleSubmit(loginForm)}>
                                    <div className="mb-3">
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Email"
                                        />
                                        <p className={errors.email && 'log-error'}>{errors.email?.message}</p>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            {...register("password")}
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Password"
                                        />
                                        <p className={errors.password && 'log-error'}>{errors.password?.message}</p>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            {...register("name")}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Name"
                                        />
                                        <p className={errors.name && 'log-error'}>{errors.name?.message}</p>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            {...register("mobile")}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Mobile Number"
                                        />
                                        <p className={errors.mobile && 'log-error'}>{errors.mobile?.message}</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary">Sign Up</button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal