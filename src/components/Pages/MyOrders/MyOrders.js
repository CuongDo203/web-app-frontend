import React, { useEffect, useState } from 'react';
import { Table, Badge, Container, Row, Col, Form, Pagination, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersOfUser } from '../../../actions/OrderActions';
import { generateVisiblePageArray } from '../../../reducers/productReducer';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './MyOrders.css';
import { useParams } from 'react-router-dom';

function MyOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const { userId } = useParams();

  // Get data from Redux store
  const orders = useSelector(state => state.getOrdersOfUserReducer?.orders || []);
  const totalPages = useSelector(state => state.getOrdersOfUserReducer?.totalPage || 0);
  const loading = useSelector(state => state.getOrdersOfUserReducer?.loading);

  useEffect(() => {
    dispatch(getOrdersOfUser(userId, currentPage - 1, ordersPerPage));
  }, [dispatch, userId, currentPage, ordersPerPage]);

  // Filter orders by status and date
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.order_date);
    const matchesStatus = statusFilter === 'all' ? true : 
      order.status.toLowerCase() === statusFilter;
    
    const matchesDateRange = (!startDate || orderDate >= new Date(startDate)) && 
      (!endDate || orderDate <= new Date(endDate));

    return matchesStatus && matchesDateRange;
  });

  // Add sorting logic before filtering
  const sortedAndFilteredOrders = filteredOrders.sort((a, b) => {
    return new Date(b.order_date) - new Date(a.order_date);
  });

  const getStatusBadge = (status) => {
    if (!status) return <Badge bg="secondary">Unknown</Badge>;

    const statusColors = {
      'pending': 'warning',
      'processing': 'info',
      'shipping': 'primary',
      'delivered': 'success',
      'cancelled': 'danger'
    };

    const normalizedStatus = status.toLowerCase();
    return (
      <Badge bg={statusColors[normalizedStatus] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setStartDate('');
    setEndDate('');
  };

  const visiblePages = generateVisiblePageArray(currentPage - 1, totalPages);
  console.log(visiblePages.length);
  console.log('currentPage', currentPage);
  console.log('totalPages', totalPages);

  return (
    <>
      <Header />
      <main className="main-content">
        <Container className="my-orders">
          <Row className="my-4">
            <Col md={3}>
              <h2>My Orders</h2>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
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
                <Form.Label>From Date</Form.Label>
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
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  max={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-end">
              <Button variant="secondary" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Shipping Method</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAndFilteredOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{(currentPage - 1) * ordersPerPage + index + 1}</td>
                      <td>{order.id}</td>
                      <td>{new Date(order.order_date).toLocaleDateString('vi-VN')}</td>
                      <td>${order.total_money}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{order.shipping_method}</td>
                      <td>{order.payment_method}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {visiblePages.map((pageNum) => (
                    <Pagination.Item
                      key={pageNum + 1}
                      active={pageNum + 1 === currentPage}
                      onClick={() => handlePageChange(pageNum + 1)}
                    >
                      {pageNum + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MyOrders;