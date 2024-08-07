import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import { Table, Pagination, Spinner, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, changePage, deleteOrderById, resetDeleteStatus } from '../../../actions/AdminActions';
import { useNavigate } from 'react-router-dom';

function OrderTable() {

    const { isLoading, currentOrderPage, limitOrderPerPages, keyword,
        visiblePages, orders, totalOrderPages, isUpdateStatusSuccessfully, isDeleted
    } = useSelector(state => state.orderAdminReducer);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIdToDelete(id)
    }

    const handleDeleteOrder = () => {
        // dispatch(deleteOrderById(idToDelete));
        // setShow(false);
        dispatch(deleteOrderById(idToDelete))
            .then(() => {
                dispatch(resetDeleteStatus())
                setShow(false);
            })
            .catch(error => {
                console.error("Failed to delete order:", error);
            });

    }

    const onPageChange = (page) => {
        dispatch(changePage(page, 'CHANGE_ORDER_PAGE'))
    }

    const handleOrderDetailClick = (id) => {
        navigate(`/admin/order/${id}`);
    }

    useEffect(() => {
        dispatch(getAllOrder(keyword, currentOrderPage, limitOrderPerPages))
    }, [currentOrderPage, limitOrderPerPages, keyword, dispatch, isUpdateStatusSuccessfully, isDeleted])

    return (
        <div className='order-table'>
            <h4>Orders </h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Shipping Method</th>
                        <th>Payment Method</th>
                        <th>Total Money</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <Spinner animation="border" variant="info" />
                    ) : (
                        <>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>{order.fullname}</td>
                                    <td>{order.phone_number}</td>
                                    <td>{order.address}</td>
                                    <td>{order.note}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.status}</td>
                                    <td>{order.shipping_method}</td>
                                    <td>{order.payment_method}</td>
                                    <td>{order.total_money}</td>
                                    <td>
                                        <div className='detail-button' 
                                            onClick={() => handleOrderDetailClick(order.id)}><MdReadMore style={{ color: "blue" }} /> detail</div>
                                        <div className='delete-button' 
                                            onClick={() => handleShow(order.id)}><MdDelete style={{ color: "red" }} /> delete</div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteOrder}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Pagination className="d-flex justify-content-center mt-5">
                <Pagination.First disabled={currentOrderPage === 0} onClick={() => onPageChange(0)} />
                <Pagination.Prev disabled={currentOrderPage === 0} onClick={() => onPageChange(currentOrderPage - 1)} />
                {visiblePages.map((page, idx) => (
                    <Pagination.Item key={idx} active={page === currentOrderPage} onClick={() => onPageChange(page)}>{page + 1}</Pagination.Item>
                ))}
                <Pagination.Next disabled={currentOrderPage === totalOrderPages - 1} onClick={() => onPageChange(currentOrderPage + 1)} />
                <Pagination.Last disabled={currentOrderPage === totalOrderPages - 1} onClick={() => onPageChange(totalOrderPages - 1)} />
            </Pagination>
        </div>
    )
}

export default OrderTable
