import React, { useEffect, useState } from 'react';
import { Table, Badge, Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersOfUser } from '../../../actions/OrderActions';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './MyOrders.css';

function MyOrders() {
  // Remove orders state since we'll get it from Redux
  const [sortedOrders, setSortedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const dispatch = useDispatch();
  
  // Get orders from Redux store
  const orders = useSelector(state => state.getOrdersOfUserReducer?.orders || []);

  useEffect(() => {
    dispatch(getOrdersOfUser());
  }, [dispatch]);

  // Update sorting effect to use Redux orders
  useEffect(() => {
    console.log('orders = ', orders)
    if (orders && orders.length > 0) {
      const sorted = [...orders].sort((a, b) => 
        new Date(b.order_date) - new Date(a.order_date)
      );

      const filtered = statusFilter === 'all' 
        ? sorted
        : sorted.filter(order => order.status.toLowerCase() === statusFilter);

      setSortedOrders(filtered);
    }
  }, [orders, statusFilter]);

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

  return (
    <>
      <Header />
      <main className="main-content">
        <Container className="my-orders">
          <Row className="my-4">
            <Col>
              <h2>My Orders</h2>
            </Col>
            <Col xs={3}>
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
            </Col>
          </Row>

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
              {sortedOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
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
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MyOrders;