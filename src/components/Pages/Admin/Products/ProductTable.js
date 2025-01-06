import React, { useEffect, useState } from 'react'
import { Table, Pagination, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, deleteProductById, getAllProducts } from '../../../../actions/AdminActions';
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import AddProduct from './AddProduct/AddProduct';
import { useNavigate } from 'react-router-dom';

function ProductTable() {

  const { currentProductPage, limitProductPerPages, totalProductPages,
    visibleProductPages, products, keyword, isLoading
  } = useSelector(state => state.productAdminReducer);
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [modalAddShow, setModalAddShow] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [data, setData] = useState(products);

  const onPageChange = (page) => {
    dispatch(changePage(page, 'CHANGE_PRODUCT_PAGE'))
  }

  useEffect(() => {
    dispatch(getAllProducts(searchKeyword, 0, currentProductPage, limitProductPerPages))
  }, [dispatch, currentProductPage, searchKeyword, limitProductPerPages])

  useEffect(() => {
    setData(products)
  }, [products])

  const handleProductDetailClick = (productId) => {
    navigate(`/admin/product/${productId}`)
  }

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShow(true);
  };

  const handleConfirmDelete = () => {
    const itemBackup = data.find(item => item.id === deleteItemId);
    setData(data.filter(item => item.id !== deleteItemId));
    dispatch(deleteProductById(deleteItemId))
      .then(() => { })
      .catch(() => {
        setData(prevData => [...prevData, itemBackup])
      })
    setShow(false)
  }

  // if(isLoading) {
  //   return <Spinner animation="border" variant="info"/>
  // }

  return (
    <>
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
            {data.map((product, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category_id}</td>
                <td className='table-action'>
                  <div className='detail-button' onClick={() => handleProductDetailClick(product.id)}>
                    <MdReadMore style={{ color: "blue" }} /> detail</div>
                  <div className='delete-button' onClick={() => handleDeleteClick(product.id)}>
                    <MdDelete style={{ color: "red" }} /> delete</div>
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
        <AddProduct show={modalAddShow} onHide={() => setModalAddShow(false)} />
      </div>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductTable
