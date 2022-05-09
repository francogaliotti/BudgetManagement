import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import '../styles/Home.css'

function Home() {

  const [listOfRecords, setListOfRecords] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8080/records').then((res) => {
      setListOfRecords(res.data)
      setTotalRecord(()=>{
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
      //res.data.map(a => a.amount).reduce((a, b) => a + b, 0)
      console.log(res.data)
    })
  }, [])

  return (
    <>
      <table className='record-table'>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Concept</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        {listOfRecords.map((record, key) => {
          return <tbody key={key}>
            <tr>
              {record.type ?
                <td className='income'>Income </td> : <td className='outcome'>Outcome </td>}
              <td>{record.concept} </td>
              <td>${record.amount} </td>
              <td>{record.date} </td>
            </tr>
          </tbody>
        })}
      </table>
      <div className='total-record'>
        <label> Total: </label>
        {totalRecord>=0 ?
          <label className='income'>${totalRecord}</label> : <label className='outcome'>${totalRecord}</label>
        }
        
      </div>
    </>

  )
}

export default Home