import React, { useEffect, useState } from 'react'
import { Table, Pagination, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getAllProducts } from '../../../actions/AdminActions';
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import AddProduct from './Products/AddProduct/AddProduct';
import { useNavigate } from 'react-router-dom';

function ProductTable() {

  const { currentProductPage, limitProductPerPages, totalProductPages,
    visibleProductPages, products, keyword
  } = useSelector(state => state.productAdminReducer);
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const [modalAddShow, setModalAddShow] = useState(false);
  const navigate = useNavigate()

  const onPageChange = (page) => {
    dispatch(changePage(page, 'CHANGE_PRODUCT_PAGE'))
  }

  useEffect(() => {
    dispatch(getAllProducts(searchKeyword, 0, currentProductPage, limitProductPerPages))
  }, [dispatch, currentProductPage, searchKeyword, limitProductPerPages])

  const handleProductDetailClick = (productId) => {
      navigate(`/admin/product/${productId}`)
  }

  return (
    <div id='admin-product-table'>
      <h4>Products</h4>
      <div id='action'>
        <Button onClick={() => setModalAddShow(true)}>Add new</Button>
        <Form.Control
          type="text"
          id="search-product5"
          placeholder='Search'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category_id}</td>
              <td className='table-action'>
              <div className='detail-button' onClick={() => handleProductDetailClick(product.id)}>
                <MdReadMore style={{ color: "blue" }} /> detail</div>
              <div className='delete-button' ><MdDelete style={{ color: "red" }} /> delete</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="d-flex justify-content-center mt-5">
        <Pagination.First disabled={currentProductPage === 0} onClick={() => onPageChange(0)} />
        <Pagination.Prev disabled={currentProductPage === 0} onClick={() => onPageChange(currentProductPage - 1)} />
        {visibleProductPages.map((page, idx) => (
          <Pagination.Item key={idx} active={page === currentProductPage} onClick={() => onPageChange(page)}>{page + 1}</Pagination.Item>
        ))}
        <Pagination.Next disabled={currentProductPage === totalProductPages - 1} onClick={() => onPageChange(currentProductPage + 1)} />
        <Pagination.Last disabled={currentProductPage === totalProductPages - 1} onClick={() => onPageChange(totalProductPages - 1)} />
      </Pagination>
      <AddProduct show={modalAddShow} onHide={() => setModalAddShow(false)}/>
    </div>
  )
}

export default ProductTable
