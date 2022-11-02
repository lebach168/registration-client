import React, { useState } from 'react';
import { Formik } from 'formik';

import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { redirect, useNavigate } from 'react-router-dom';

let API_URL = "https://registration-server-kohl.vercel.app";
export default function RegistrationForm() {
    const navigate = useNavigate();
    async function fetchData(url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": data.username,
                "email": data.email,
                "password": data.password,
            }),
        });

        return await res.json();
    }
    const mutation = useMutation(data => {
        return fetchData(API_URL + "/users", data);

    }, {
        //server response here
        onSuccess: (data) => {
            const user = { username: data.username, email: data.email }
            localStorage.setItem('user', JSON.stringify(user));
            return navigate(`/user/${user.username}`);
        },
    })

    return (

        <div className="w-full h-auto overflow-scroll block h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center" >
            <div className="bg-white py-6 px-10 sm:max-w-md w-full ">
                <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                    Registration Form
                </div>
                <Formik
                    initialValues={{ email: "", username: "" }}
                    onSubmit={values => {
                        mutation.mutate(values);
                    }}
                    validationSchema={yup.object().shape({
                        email: yup.string()
                            .email()
                            .required("Required"),
                        username: yup.string().required('username is required').matches(/^\s*\S[\s\S]*$/, '* This field cannot contain blankspaces'),
                        password: yup.string().required('Password is required'),

                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        id="email"
                                        placeholder="Enter your email" S
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mt-8"

                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback" style={{ color: "red" }}>{errors.email}</div>
                                    )}
                                </div>

                                <div>
                                    <input type="text"
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mt-8" placeholder="Username " />
                                    {errors.username && touched.username && (
                                        <div className="input-feedback" style={{ color: "red" }}>{errors.username}</div>
                                    )}
                                </div>
                                <div className="">
                                    <input type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mt-8" placeholder="Password " />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback" style={{ color: "red" }}>{errors.password}</div>
                                    )}
                                </div>
                                <div className="flex justify-center my-6">
                                    <button className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
                                        type="submit" >
                                        Create Account
                                    </button>
                                </div>
                                {/* <DisplayFormikState {...props} /> */}
                            </form>
                        );
                    }}
                </Formik>

            </div>
        </div >
    )
}