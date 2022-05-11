import React from 'react'
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/Register.css'

function Register() {
    let navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
        email: ""
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
        email: Yup.string().email().required()
    })
    const onSubmit = (data) => {
        axios.post('http://localhost:8080/auth/register', data).then((res) => {
            navigate(`/`)
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err.response.data.err.errors[0].message
            })
            console.log(err)

        })
    }
    return (
        <div className='registerContainer'>
            <div className='registerComponent'>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="formContainer">
                        <label>Username: </label>
                        <ErrorMessage name='username' component='span' />
                        <Field
                            autoComplete="off"
                            id="fieldAddRecord"
                            name="username"
                            placeholder="Your username" />
                        <label>Password: </label>
                        <ErrorMessage name='password' component='span' />
                        <Field
                            autoComplete="off"
                            type="password"
                            id="fieldAddRecord"
                            name="password"
                            placeholder="Your password" />
                        <label>Email: </label>
                        <ErrorMessage name='email' component='span' />
                        <Field
                            autoComplete="off"
                            id="fieldAddRecord"
                            name="email"
                            placeholder="Your email" />
                        <button type='submit'>Register</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register