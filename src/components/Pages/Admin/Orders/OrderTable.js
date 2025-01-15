import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import { Table, Pagination, Spinner, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, changePage, deleteOrderById, resetDeleteStatus } from '../../../../actions/AdminActions';
import { useNavigate } from 'react-router-dom';
import './OrderTable.css';

function OrderTable() {

    const { isLoading, currentOrderPage, limitOrderPerPages, keyword,
        visiblePages, orders, totalOrderPages
    } = useSelector(state => state.orderAdminReducer);
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(orders)
    const [statusFilter, setStatusFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);

    const handleDeleteClick = (id) => {
        setShow(true);
        setIdToDelete(id)
    }

    const handleConfirmDeleteOrder = () => {
        const itemBackup = data.find(item => item.id === idToDelete);
        setData(data.filter(item => item.id !== idToDelete));
        dispatch(deleteOrderById(idToDelete))
            .then(() => {
            })
            .catch(() => {
                setData(prevData => [...prevData, itemBackup])
            });
        setShow(false);
    }

    const onPageChange = (page) => {
        dispatch(changePage(page, 'CHANGE_ORDER_PAGE'))
    }

    const handleOrderDetailClick = (id) => {
        navigate(`/admin/order/${id}`);
    }

    const filteredOrders = data.filter(order => {
        const orderDate = new Date(order.order_date);
        
        // Filter by status
        const matchesStatus = statusFilter === 'all' ? true : 
          order.status.toLowerCase() === statusFilter;
        
        // Filter by date range
        const matchesDateRange = (!startDate || orderDate >= new Date(startDate)) && 
          (!endDate || orderDate <= new Date(endDate));
      
        return matchesStatus && matchesDateRange;
      });
      
      // Add filter reset function
      const handleResetFilters = () => {
        setStatusFilter('all');
        setStartDate('');
        setEndDate('');
      };

    useEffect(() => {
        dispatch(getAllOrder(keyword, currentOrderPage, limitOrderPerPages))
    }, [currentOrderPage, limitOrderPerPages, keyword, dispatch])

    useEffect(() => {
        setData(orders)
    }, [orders])

    return (
        <div className='order-table'>
            <h4 className='text-center order-title'>Orders </h4>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="text-secondary fw-bold mb-2">Status Filter</Form.Label>
                        <Form.Select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className="text-secondary fw-bold mb-2">From Date</Form.Label>
                        <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={endDate || new Date().toISOString().split('T')[0]}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className="text-secondary fw-bold mb-2">To Date</Form.Label>
                        <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        max={new Date().toISOString().split('T')[0]}
                        />
                    </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleResetFilters}
                        className='px-4 py-2 rounded-pill'
                        style={{
                            transition: 'all 0.3s ease',
                            borderWidth: '2px'
                        }}
                    >
                        <i className="fas fa-undo-alt me-2"></i>
                        Reset Filters
                    </Button>
                </Col>
            </Row>
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
                    {/* {isLoading ? (
                        <Spinner animation="border" variant="info" />
                    ) : ( */}
                        <>
                            {filteredOrders.map((order, index) => (
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
                                        <div className="action-cell">
                                            <div 
                                                className='action-button detail-button'
                                                onClick={() => handleOrderDetailClick(order.id)}
                                                title="View Details"
                                            >
                                                <MdReadMore />
                                                Details
                                            </div>
                                            <div 
                                                className='action-button delete-button'
                                                onClick={() => handleDeleteClick(order.id)}
                                                title="Delete Order"
                                            >
                                                <MdDelete />
                                                Delete
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    {/* )} */}
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
                    <Button variant="danger" onClick={handleConfirmDeleteOrder}>
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
