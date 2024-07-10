import React, {useState} from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

function UserProfile() {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    payment_method: 'cod',   //Mặc định là thanh toán khi nhận hàng COD
    shipping_method: 'express',  //Mặc định là giao hàng nhanh
})

  return (
    <>
      <Header />
      <Container>
        <Row >
          <Col className='text-center'>
            <h1 >Thông tin tài khoản</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="name">Họ và tên</FormLabel>
                <FormControl type="text" id="name" required value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl type="email" id="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                <FormControl type="text" id="phone" required value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                <FormControl type="text" id="address" required value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="shipping_method">Ngày sinh</FormLabel>
                <FormControl type='date'/>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="pasword">Mật khẩu</FormLabel>
                <FormControl type="pasword" id="pasword" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </FormGroup>
              <Button variant='primary'>Cập nhật</Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default UserProfile
