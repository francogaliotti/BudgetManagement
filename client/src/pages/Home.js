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
import ReactPaginate from 'react-paginate'

function Home() {
  const navigate = useNavigate();
  const [listOfRecords, setListOfRecords] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})
  const [pageNumber, setPageNumber] = useState(0)
  const recordsPerPage = 10
  const pagesVisited = pageNumber * recordsPerPage
  const { authState } = useContext(AuthContext)

  const displayRecords = listOfRecords.slice(pagesVisited, pagesVisited + recordsPerPage)
  const pageCount = Math.ceil(listOfRecords.length / recordsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      <div className='total-record'>
        <h1 className='username'> User: {authState.username}</h1>
        <h1 className='record-count'>Total:
          {totalRecord >= 0 ?
            <label className='income'>{"$" + totalRecord}</label> : <label className='expense'>{"-$" + -totalRecord}</label>
          }</h1>
      </div>
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
        {displayRecords.map((record, key) => {
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
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

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