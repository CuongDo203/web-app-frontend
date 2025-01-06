import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../../../actions/productActions'
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import './Categories.css'

function CategoryTable() {

  const dispatch = useDispatch()
  const [data, setData] = useState(null)

  useEffect(() => {
    dispatch(getCategories()).then((dataResponse) => {
      console.log(dataResponse)
      setData(dataResponse)
    })
  }, [dispatch])

  return (
    <div id='admin-category-table'>
      <h4>Categories</h4>
      <Button className='mb-3'>Add new</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== null && data.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <div className='group-button' >
                  <Button><MdReadMore /> detail</Button>
                  <Button variant='danger'><MdDelete /> delete</Button>
                </div>
              </td>
            </tr>
          )
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default CategoryTable
