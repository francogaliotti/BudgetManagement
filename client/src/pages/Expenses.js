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

function Expenses() {
  const navigate = useNavigate();
  const [listOfExpenses, setListOfExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})
  const [pageNumber, setPageNumber] = useState(0)
  const recordsPerPage = 10
  const pagesVisited = pageNumber * recordsPerPage
  const { authState } = useContext(AuthContext)

  const displayRecords = listOfExpenses.slice(pagesVisited, pagesVisited + recordsPerPage)
  const pageCount = Math.ceil(listOfExpenses.length / recordsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getExpenses = () => {
    axios.get('http://localhost:8080/records/type/0', {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      setListOfExpenses(res.data)

    })
  }

  const getExpensesByCategory = (id) => {
    if (id > 0) {
      axios.get(`http://localhost:8080/records/category/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((res) => {
        setListOfExpenses(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      getExpenses()
    }
  }

  const getCategories = () => {
    axios.get(`http://localhost:8080/categories/0`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then(res => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login')
    } else {
      getExpenses()
      getCategories()
    }
  }, [])

  return (
    <>
      <div className='total-record'>
        <div className='selectContainer'>
          <label>Filter by category:</label>
          <select id='fieldAddRecord'
            onClick={(e) => { getExpensesByCategory(e.target.value) }}
            onKeyUp={(e) => { getExpensesByCategory(e.target.value) }}>
            <option value="0"></option>
            {categories.map((category, key) => {
              return (
                <option key={key} value={category.id}>{category.name}</option>
              )
            })}
          </select>
        </div>
      </div>
      <table className='record-table'>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Concept</th>
            <th scope="col">Category</th>
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
              <td>{record.Category.name} </td>
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
        getRecords={getExpenses} />}
      {openDeleteModal && <ConfirmDeleteModal
        closeModal={setOpenDeleteModal}
        record={recordSelected}
        getRecords={getExpenses} />}
    </>

  )
}

export default Expenses