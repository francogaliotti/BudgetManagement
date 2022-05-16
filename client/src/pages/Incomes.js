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

function Incomes() {

  const navigate = useNavigate();
  const [listOfIncomes, setListOfIncomes] = useState([])
  const [categories, setCategories] = useState([])
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})
  const [pageNumber, setPageNumber] = useState(0)
  const recordsPerPage = 10
  const pagesVisited = pageNumber * recordsPerPage
  const { authState } = useContext(AuthContext)

  const displayRecords = listOfIncomes.slice(pagesVisited, pagesVisited + recordsPerPage)
  const pageCount = Math.ceil(listOfIncomes.length / recordsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getIncomes = () => {
    axios.get('http://localhost:8080/records/type/1', {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      setListOfIncomes(res.data)

    })
  }

  const getCategories = () => {
    axios.get(`http://localhost:8080/categories/1`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then(res => {
      setCategories(res.data)
    })
  }

  const getIncomesByCategory = (id) => {
    if (id > 0) {
      axios.get(`http://localhost:8080/records/category/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((res) => {
        setListOfIncomes(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      getIncomes()
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login')
    } else {
      getIncomes()
      getCategories()
    }
  }, [])

  return (
    <>
      <div className='total-record'>
        <h1 className='username' id='listH1'> List of Incomes</h1>
        <div className='selectContainer'>
          <label>filter by category:</label>
          <select id='fieldAddRecord'
            onClick={(e) => { getIncomesByCategory(e.target.value) }}
            onKeyUp={(e) => { getIncomesByCategory(e.target.value) }}>
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
        getRecords={getIncomes} />}
      {openDeleteModal && <ConfirmDeleteModal
        closeModal={setOpenDeleteModal}
        record={recordSelected}
        getRecords={getIncomes} />}
    </>

  )
}

export default Incomes