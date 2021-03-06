import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../styles/Modal.css'

function EditRecordModal({ closeModal, record, getRecords }) {

    const [categories, setCategories] = useState([])
    const initialValues = {
        concept: record.concept,
        amount: record.amount,
        date: record.date,
        CategoryId: record.Category.id
    }

    const validationSchema = Yup.object().shape({
        concept: Yup.string().min(1).max(25),
        amount: Yup.number().positive(),
        type: Yup.boolean(),
        date: Yup.date().max(new Date(), "Future date not allowed"),
        CategoryId: Yup.string().required('must select a category')
    })

    const updateRecord = (data) => {
        axios.put(`http://localhost:8080/records/${record.id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            closeModal(false)
            getRecords()
        })
    }

    useEffect(() => {
        if(record.type){
            axios.get(`http://localhost:8080/categories/1`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(res => {
                setCategories(res.data)
            })
        }else{
        axios.get(`http://localhost:8080/categories/0`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(res => {
                setCategories(res.data)
            })
        }
    }, [])

    return (
        <div className="modalBackground" >

            <div className='addRecordComponent'>
                <Formik initialValues={initialValues} onSubmit={updateRecord} validationSchema={validationSchema}>
                    <Form className="formContainer">
                        <label className='close-button' onClick={() => { closeModal(false) }}> X</label>
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
                        <label>Type: (not editable)</label>
                        <ErrorMessage name='type' component='span' />
                        <Field
                            autoComplete="off"
                            id="fieldAddRecord"
                            name="type"
                            placeholder="Amount"
                            as="select"
                            value={record.type}>
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

                        <button type='submit'> Update Record</button>
                    </Form>
                </Formik>
            </div>

        </div>
    )
}

export default EditRecordModal