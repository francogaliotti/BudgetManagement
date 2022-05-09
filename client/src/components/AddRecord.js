import React from 'react'
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../styles/AddRecord.css'

function AddRecord() {
    const navigate = useNavigate()
    const initialValues = {
        concept: "",
        amount: 0,
        type: true
    }
    const onSubmit = (data) => {
        axios.post('http://localhost:8080/records', data).then((res) => {
            console.log(res)
            navigate('/')
        })
    }
    const validationSchema = Yup.object().shape({
        concept: Yup.string().min(1).max(25).required(),
        amount: Yup.number().positive().required(),
        type: Yup.boolean().required(),
        date: Yup.date().max(new Date(), "Future date not allowed").required()
    })

    return (
        <div className='addRecordComponent'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Concept: </label>
                    <ErrorMessage name='concept' component='span' />
                    <Field
                        autoComplete="off"
                        id="fieldAddRecord"
                        name="concept"
                        placeholder="Concept" />
                    <label>Amount: </label>
                    <ErrorMessage name='amount' component='span' />
                    <Field
                        autoComplete="off"
                        id="fieldAddRecord"
                        name="amount"
                        placeholder="Amount" />
                    <label>Type: </label>
                    <ErrorMessage name='type' component='span' />
                    <Field
                        autoComplete="off"
                        id="fieldAddRecord"
                        name="type"
                        placeholder="Amount"
                        as="select">
                        <option value="true">Income</option>
                        <option value="false">Outcome</option>
                    </Field>
                    <label>Date: </label>
                    <ErrorMessage name='date' component='span' />
                    <Field
                        autoComplete="off"
                        id="fieldAddRecord"
                        name="date"
                        placeholder="Format: Month/Day/Year" />

                    <button type='submit'> Add Record</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddRecord