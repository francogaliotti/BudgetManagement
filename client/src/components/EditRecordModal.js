import React from 'react'
import * as Yup from 'yup'
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../styles/EditRecordModal.css'

function EditRecordModal({ closeModal, record, setListOfRecords, setTotalRecord }) {


    const initialValues = {
        concept: record.concept,
        amount: record.amount,
        date: record.date
    }

    const validationSchema = Yup.object().shape({
        concept: Yup.string().min(1).max(25),
        amount: Yup.number().positive(),
        type: Yup.boolean(),
        date: Yup.date().max(new Date(), "Future date not allowed")
    })

    const updateRecord = (data) => {
        axios.put(`http://localhost:8080/records/${record.id}`, data).then((res) => {
            closeModal(false)
            axios.get('http://localhost:8080/records').then((res) => {
                setListOfRecords(res.data)
                setTotalRecord(() => {
                    let sum = 0
                    res.data.forEach(record => {
                        if (record.type) {
                            sum += record.amount
                        } else {
                            sum -= record.amount
                        }
                    })
                    return sum
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className="modalBackground" >
            <div className="modalContainer">
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
                                <option value="false">Outcome</option>
                            </Field>
                            <label>Date: </label>
                            <ErrorMessage name='date' component='span' />
                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="date"
                                placeholder="Format: Month/Day/Year" />

                            <button type='submit'> Update Record</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default EditRecordModal