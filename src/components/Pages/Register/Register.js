import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { useState } from 'react'
import Validations from '../../Validations'
import { register } from '../../../actions/registerActions'
import { useDispatch, useSelector } from 'react-redux';

function Register() {

    const [userRegister, setUserRegister] = useState({
        phone: '',
        password: '',
        retypedPassword: '',
        address: '',
        dateOfBirth: undefined,
        name: ''
    })
    const [errors, setErrors] = useState({})
    const {isRegisterSuccessfully} = useSelector(state => state.register)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // event.preventDefault()
        dispatch(register(userRegister))
        if(isRegisterSuccessfully) {
            alert('Dang ky thanh cong')
            navigate('/login')
        }
    }

    const handleValidate = (e) => {
        e.preventDefault()
        setErrors(Validations(userRegister))
        // console.log(errors);
    }

    

    return (
        // <form id='register' className="container">
        //     <div className="row" style={{ height: 'inherit' }}>
        //         <div className="col-md-6 offset-md-3 main-form">
        //             <div className="register-form mx-auto">
        //                 <h2 className="register-header">Đăng ký</h2>
        //                 <div className="form-group">
        //                     <label htmlFor="phone">Số điện thoại</label>
        //                     <input type="text" className="form-control" id="email" />
        //                     <div className="divider-nospace"></div>
        //                 </div>
        //                 <div className="mt-3"></div>
        //                 <div className="form-group password-field">
        //                     <label htmlFor="password">Mật khẩu</label>
        //                     <div className="password-field-input">
        //                         <input type="password" placeholder="Ít nhất 3 kí tự" className="form-control" id="password" />
        //                         <i className="password-toggle fas fa-eye-slash"></i>
        //                     </div>
        //                     <div className="divider-nospace"></div>
        //                 </div>
        //                 <div className="mt-3"></div>
        //                 <div className="form-group password-field">
        //                     <label htmlFor="password">Nhập lại mật khẩu</label>
        //                     <div className="password-field-input">
        //                         <input type="password" placeholder="Ít nhất 3 kí tự" className="form-control" id="confirm-password" />
        //                         <i className="password-toggle fas fa-eye-slash"></i>
        //                     </div>
        //                     <div className="divider-nospace"></div>
        //                 </div>
        //                 <div className="mt-3"></div>
        //                 <div className="form-group">
        //                     <label htmlFor="full-name">Họ và tên</label>
        //                     <input type="text" className="form-control" id="full-name" />
        //                     <div className="divider-nospace"></div>
        //                 </div>
        //                 <div className="mt-3"></div>
        //                 <div className="form-group">
        //                     <label htmlFor="address">Địa chỉ</label>
        //                     <input type="text" className="form-control" id="address" />
        //                     <div className="divider-nospace"></div>
        //                 </div>
        //                 <div className="form-group">
        //                     <div className="form-check checkbox-text">
        //                         <span style={{ display: 'flex' }}>
        //                             <input type="checkbox" className="form-check-input" id="agree" />
        //                             <label htmlFor="agree" className="form-check-label text-start">Tôi đồng ý với các điều khoản</label>
        //                         </span>
        //                     </div>
        //                 </div>
        //                 <button type="button" className="register-button">Đăng ký</button>
        //                 <div className="divider"></div>
        //                 <div className="text-center mt-3">Bạn đã có tài khoản?
        //                     <span><Link to="/login" className="register-link">Đăng nhập</Link></span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </form>
        <form id='register' className="container mt-3">
            <Row style={{ height: 'inherit' }}>
                <Col md={6} className="offset-md-3 main-form">
                    <div className="register-form mx-auto">
                        <h2 className="register-header">Đăng ký</h2>
                        <Form.Group>
                            <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" id="phone" required 
                            value={userRegister.phone} onChange={(e) => setUserRegister({...userRegister, phone: e.target.value})} onFocus={(e)=>handleValidate}/>
                            {errors.phone && <p className='text-danger'>Số điện thoại phải ít nhất 6 ký tự</p>}
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group className="password-field">
                            <Form.Label htmlFor="password">Mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control type="password" placeholder="Ít nhất 8 kí tự" id="password" required 
                                value={userRegister.password} onChange={(e) => setUserRegister({...userRegister, password: e.target.value})}/>
                                <i className="password-toggle fas fa-eye-slash"></i>
                            </div>
                            {userRegister.password.length < 8 ? <p className='text-danger'>Mật khẩu phải ít nhất 8 ký tự</p> : ''}
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group className="password-field">
                            <Form.Label htmlFor="confirm-password">Nhập lại mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control type="password" placeholder="Ít nhất 3 kí tự" id="confirm-password" required 
                                value={userRegister.retypedPassword} onChange={(e) => setUserRegister({...userRegister, retypedPassword: e.target.value})}/>
                                <i className="password-toggle fas fa-eye-slash"></i>
                            </div>
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group>
                            <Form.Label htmlFor="full-name">Họ và tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ và tên" id="full-name" required 
                            value={userRegister.name} onChange={(e) => setUserRegister({...userRegister, name: e.target.value})}/>
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group>
                            <Form.Label htmlFor="dob">Ngày tháng năm sinh</Form.Label>
                            <Form.Control type="date" placeholder="Vui lòng nhập ngày tháng năm sinh" id="dob" required 
                            value={userRegister.dateOfBirth} onChange={(e) => setUserRegister({...userRegister, dateOfBirth: e.target.value})}/>
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group>
                            <Form.Label htmlFor="address">Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" id="address" required
                            value={userRegister.address} onChange={(e) => setUserRegister({...userRegister, address: e.target.value})}/>
                        </Form.Group>
                        {/* <Form.Group>
                            <div className="form-check checkbox-text">
                                <span style={{ display: 'flex' }}>
                                    <Form.Check type="checkbox" id="agree" label="Tôi đồng ý với các điều khoản" 
                                    checked = {isChecked} onChange={() => setIsChecked(!isChecked)}/>
                                </span>
                            </div>
                        </Form.Group> */}
                        <Button type="button" className="register-button" onClick={handleSubmit}>Đăng ký</Button>
                        <div className="divider"></div>
                        <div className="text-center mt-3">Bạn đã có tài khoản?
                            <span><Link to="/login" className="register-link"> Đăng nhập</Link></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </form>
    )
}

export default Register
