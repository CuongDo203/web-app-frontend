import React, { useEffect } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import './orderConfirm.css'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { getOrderById } from '../../../actions/OrderConfirmAction';

function OrderConfirm() {

  const { orderResponse, error } = useSelector(state => state.getOrderDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderById(10))
  }, [dispatch])

  return (
    <>
      <Header />
      <Container id="orderConfirm">
        <Row >
          <Col className='text-center'>
            <h1 >Xác nhận đơn hàng</h1>
            <p>Cảm ơn bạn đã đặt hàng! Dưới đây là thông tin chi tiết về đơn hàng của bạn.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2 className="product-header">Thông tin người nhận</h2>
            <Form >
              <FormGroup className="mb-3">
                <FormLabel htmlFor="name">Họ và tên: {orderResponse.fullname}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="email">Email: {orderResponse.email}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="phone">Số điện thoại: {orderResponse.phone_number}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="address">Địa chỉ: {orderResponse.address}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="note">Ghi chú: {orderResponse.note}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="shipping_method">Phương thức vận chuyển: {orderResponse.shipping_method}</FormLabel>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="payment_method">Phương thức thanh toán: {orderResponse.payment_method}</FormLabel>
              </FormGroup>
            </Form>
          </Col>
          <Col md={6}>
            <h2 className="product-header">Thông tin chi tiết về sản phẩm</h2>
            <Table striped bordered hover variant='dark' >
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                {orderResponse.order_details.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <img src={item.product.thumbnail} alt="Product" className="product-image" />
                      <span className="product-name">{item.product.name}</span>
                    </td>
                    <td>{item.numberOfProducts}</td>
                    <td>${item.product.price}</td>
                    <td>${(item.product.price * item.numberOfProducts).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="text-end mt-3">
            <h4>Tổng giá: ${orderResponse.total_money}</h4>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default OrderConfirm
