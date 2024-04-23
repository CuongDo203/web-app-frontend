import './register.css'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'

function Register() {
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
        <form id='register' className="container">
            <Row style={{ height: 'inherit' }}>
                <Col md={6} className="offset-md-3 main-form">
                    <div className="register-form mx-auto">
                        <h2 className="register-header">Đăng ký</h2>
                        <Form.Group>
                            <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" id="phone" />
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group className="password-field">
                            <Form.Label htmlFor="password">Mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control type="password" placeholder="Ít nhất 3 kí tự" id="password" />
                                <i className="password-toggle fas fa-eye-slash"></i>
                            </div>
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group className="password-field">
                            <Form.Label htmlFor="confirm-password">Nhập lại mật khẩu</Form.Label>
                            <div className="password-field-input">
                                <Form.Control type="password" placeholder="Ít nhất 3 kí tự" id="confirm-password" />
                                <i className="password-toggle fas fa-eye-slash"></i>
                            </div>
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group>
                            <Form.Label htmlFor="full-name">Họ và tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ và tên" id="full-name" />
                        </Form.Group>
                        <div className="mt-3"></div>
                        <Form.Group>
                            <Form.Label htmlFor="address">Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" id="address" />
                        </Form.Group>
                        <Form.Group>
                            <div className="form-check checkbox-text">
                                <span style={{ display: 'flex' }}>
                                    <Form.Check type="checkbox" id="agree" label="Tôi đồng ý với các điều khoản" />
                                </span>
                            </div>
                        </Form.Group>
                        <Button type="button" className="register-button">Đăng ký</Button>
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
