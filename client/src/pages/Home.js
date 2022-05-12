import React from 'react'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import '../styles/Home.css'
import EditRecordModal from '../components/EditRecordModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from '../helpers/AuthContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const [listOfRecords, setListOfRecords] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login')
    } else {
      axios.get('http://localhost:8080/records', {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((res) => {
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
    }
  }, [])

  return (
    <>
      <h1> User: {authState.username}</h1>
      <table className='record-table'>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Concept</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        {listOfRecords.map((record, key) => {
          return <tbody key={key}>
            <tr>
              {record.type ?
                <td className='income'>Income </td> : <td className='expense'>Expense </td>}
              <td>{record.concept} </td>
              <td>{"$" + record.amount} </td>
              <td>{record.date} </td>
              <td className='buttons'>
                <EditIcon className="editIcon" onClick={() => {
                  setOpenUpdateModal(true)
                  setRecordSelected(record)
                }} />
                <DeleteIcon className='deleteIcon' onClick={() => {
                  setOpenDeleteModal(true)
                  setRecordSelected(record)
                }} />
              </td>
            </tr>
          </tbody>
        })}
      </table>
      <div className='total-record'>
        <label> Total: </label>
        {totalRecord >= 0 ?
          <label className='income'>{"$" + totalRecord}</label> : <label className='expense'>{"-$" + -totalRecord}</label>
        }
      </div>
      {openUpdateModal && <EditRecordModal
        closeModal={setOpenUpdateModal}
        record={recordSelected}
        setListOfRecords={setListOfRecords}
        setTotalRecord={setTotalRecord} />}
      {openDeleteModal && <ConfirmDeleteModal
        closeModal={setOpenDeleteModal}
        record={recordSelected}
        setListOfRecords={setListOfRecords}
        setTotalRecord={setTotalRecord} />}
    </>

  )
}

export default Home