import React from 'react'
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../styles/AddRecord.css'
import { useEffect, useState } from 'react'

function AddRecord() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const initialValues = {
        concept: "",
        amount: 0,
        type: true
    }
    const onSubmit = (data) => {
        console.log(data)
        axios.post('http://localhost:8080/records', data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            console.log(res)
            navigate('/')
        }).catch(err => {
            console.log(err.data)
        })
    }
    const validationSchema = Yup.object().shape({
        concept: Yup.string().min(1).max(25).required(),
        amount: Yup.number().positive().required(),
        type: Yup.boolean().required(),
        date: Yup.date().max(new Date(), "Future date not allowed").required(),
        CategoryId: Yup.string().required('must select a category')
    })

    const getCategories = (type) => {
        if (type == "true") {
            axios.get(`http://localhost:8080/categories/1`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(res => {
                setCategories(res.data)
            })
        } else {
            axios.get(`http://localhost:8080/categories/0`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(res => {
                setCategories(res.data)
            })
        }

    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='addRecordContainer'>
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
                            as="select"
                            onKeyUp={(e) => { getCategories(e.target.value) }}
                            onClick={(e) => { getCategories(e.target.value) }}>
                            <option value="true">Income</option>
                            <option value="false">Expense</option>
                        </Field>
                        <label>Category: </label>
                        <ErrorMessage name='CategoryId' component='span' />
                        <Field
                            autoComplete="off"
                            id="fieldAddRecord"
                            name="CategoryId"
                            placeholder="Amount"
                            as="select">
                            <option></option>
                            {categories.map((category, key) => {
                                return (
                                    <option value={category.id}>{category.name}</option>
                                )
                            })}
                        </Field>
                        <label>Date: </label>
                        <ErrorMessage name='date' component='span' />
                        <Field
                            autoComplete="off"
                            id="fieldAddRecord"
                            name="date"
                            placeholder="Format: Month/Day/Year or Year/Month/Day" />

                        <button type='submit'> Add Record</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddRecord