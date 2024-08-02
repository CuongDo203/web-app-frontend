import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Validations from '../../Validations'
import { register } from '../../../actions/registerActions'
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify'

function Register() {

    const [userRegister, setUserRegister] = useState({
        phone: '',
        email: '',
        password: '',
        retypedPassword: '',
        address: '',
        dateOfBirth: undefined,
        name: ''
    })
    const [errors, setErrors] = useState({});
    const { isRegisterSuccessfully } = useSelector(state => state.register);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowRetypedPassword, setIsShowRetypedPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // event.preventDefault()
        setErrors(Validations(userRegister))
        if(errors.email)  {
            toast.warn(errors.email)
            return
        }
        if(errors.name) {
            toast.warn(errors.name)
            return
        }
        if(errors.password) {
            toast.warn(errors.password)
            return
        }
        if(errors.retypedPassword) {
            toast.warn(errors.retypedPassword)
            return
        }
        dispatch(register(userRegister))
        if (isRegisterSuccessfully) {
            toast.success('Dang ky thanh cong')
            navigate('/login')
        }
    }

    const handleValidate = (e) => {
        e.preventDefault()
        setErrors(Validations(userRegister))
        // console.log(errors);
    }



    return (
        <form id='register' className="container">
            {/* <div className="offset-md-3 main-form"> */}
            <div className="register-form mx-auto">
                <h2 className="register-header">Đăng ký tài khoản</h2>
                {/* <Row> */}
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập số điện thoại" 
                                id="phone" 
                                required
                                value={userRegister.phone} 
                                onChange={(e) => setUserRegister({ ...userRegister, phone: e.target.value })} 
                                onFocus={(e) => handleValidate(e)} 
                                name={errors.phone}/>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="text" placeholder="Nhập email" id="email" required
                                value={userRegister.email} onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })} onFocus={(e) => handleValidate(e)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className="password-field mt-2">
                            <Form.Label htmlFor="password">Mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control 
                                    type={!isShowPassword ? "password" : "text"} 
                                    placeholder="Ít nhất 8 kí tự" 
                                    id="password" 
                                    required
                                    value={userRegister.password} onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })} />
                                {!isShowPassword ? <FaEyeSlash className='password-toggle' onClick={() => setIsShowPassword(!isShowPassword)} /> :
                                    <FaEye className='password-toggle' onClick={() => setIsShowPassword(!isShowPassword)} />}
                            </div>
                        </Form.Group>
                    </Col>
                    {/* <div className="mt-3"></div> */}
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className="password-field mt-2">
                            <Form.Label htmlFor="confirm-password">Nhập lại mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control 
                                    type={!isShowRetypedPassword ? "password" : "text"} 
                                    placeholder="Ít nhất 8 kí tự" 
                                    id="confirm-password" 
                                    required
                                    value={userRegister.retypedPassword} onChange={(e) => setUserRegister({ ...userRegister, retypedPassword: e.target.value })} />
                                {!isShowRetypedPassword ? <FaEyeSlash className='password-toggle' onClick={() => setIsShowRetypedPassword(!isShowRetypedPassword)} /> :
                                    <FaEye className='password-toggle' onClick={() => setIsShowRetypedPassword(!isShowRetypedPassword)} />}
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <div className="mt-3"></div> */}
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor="full-name">Họ và tên</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập họ và tên" 
                                id="full-name" 
                                required
                                value={userRegister.name} 
                                onChange={(e) => setUserRegister({ ...userRegister, name: e.target.value })} />
                        </Form.Group>
                    </Col>
                    {/* <div className="mt-3"></div> */}
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor="dob">Ngày tháng năm sinh</Form.Label>
                            <Form.Control type="date" placeholder="Vui lòng nhập ngày tháng năm sinh" id="dob" required
                                value={userRegister.dateOfBirth} onChange={(e) => setUserRegister({ ...userRegister, dateOfBirth: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>
                {/* <div className="mt-3"></div> */}
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor="address">Địa chỉ</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập địa chỉ" 
                                id="address" 
                                required
                                value={userRegister.address} 
                                onChange={(e) => setUserRegister({ ...userRegister, address: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>
                {/* </Row> */}
                <Button type="button" className="register-button" onClick={handleSubmit}>Đăng ký</Button>
                <div className="divider"></div>
                <div className="text-center mt-3">Bạn đã có tài khoản?
                    <span><Link to="/login" className="register-link"> Đăng nhập</Link></span>
                </div>
            </div>
            {/* </div> */}
        </form>
    )
}

export default Register
