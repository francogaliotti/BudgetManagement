import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function FilterModal({ closeModal }) {
    let navigate = useNavigate();
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className='modalContent'>
                    <div className='modalHeader'>
                        <label className='close-button' onClick={() => { closeModal(false) }}> X</label>
                        <h1>Filter by...</h1>
                    </div>
                    <div className='modalButtons'>
                        <button id="incomesBtn" onClick={() => {
                            navigate('/incomes')
                            closeModal(false)
                        }}> Incomes</button>
                        <button id="expensesBtn" onClick={() => {
                            navigate('/expenses')
                            closeModal(false)
                        }}> Expenses</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterModal