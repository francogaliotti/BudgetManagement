import axios from 'axios'
import React from 'react'

function ConfirmDeleteModal({ closeModal, record, setListOfRecords, setTotalRecord, getRecords }) {

    const deleteRecord = () => {
        axios.delete(`http://localhost:8080/records/${record.id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            closeModal(false)
            getRecords()
        })
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className='modalContent'>
                    <div className='modalHeader'>
                        <label className='close-button' id='close' onClick={() => { closeModal(false) }}> X</label>
                        <h1>Delete Record?</h1>
                    </div>
                    <div className='modalButtons'>
                        <button onClick={deleteRecord}> Yes</button>
                        <button onClick={() => { closeModal(false) }} id="cancelBtn"> No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal