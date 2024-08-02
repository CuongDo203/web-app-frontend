import React, { useState } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../actions/UpdateUserActions';
import './UserProfile.css'

function UserProfile() {

  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    fullname: user !== null ? user.fullname : '',
    address: user !== null ? user.address : '',
    dateOfBirth: user !== null ? user.date_of_birth : null,
    password: '',
    retypedPassword: ''
  })

  const onUpdateInfoClick = () => {
    console.log('id ' ,user.id)
    console.log(formData)
    dispatch(updateUser(user.id, formData))
  }

  return (
    <>
      <Header />
      <Container className='user-profile'>
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
                <FormControl type="text" id="name" value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                <FormControl type="text" id="address" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="update_date">Ngày sinh</FormLabel>
                <FormControl type='date' id='update_date' value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="pasword">Mật khẩu mới</FormLabel>
                <FormControl type="pasword" id="pasword" required value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="retyped-pasword">Nhập lại mật khẩu</FormLabel>
                <FormControl type="pasword" id="retyped-pasword" required value={formData.retypedPassword}
                  onChange={(e) => setFormData({ ...formData, retypedPassword: e.target.value })} />
              </FormGroup>
              <Button variant='primary' onClick={() => onUpdateInfoClick()}>Cập nhật</Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default UserProfile
