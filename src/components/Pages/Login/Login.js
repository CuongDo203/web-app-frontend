import Footer from '../../Footer/Footer'
import './login.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            {/* <div id="login" className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="login-form mx-auto">
                            <h2 className="login-header">Đăng nhập</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email/Phone</label>
                                <input type="text" className="form-control mt-2" id="email" />
                                <div className="divider-nospace"></div>
                            </div>
                            <div className="mt-4"></div>
                            <div className="form-group password-field">
                                <label htmlFor="password">Mật khẩu</label>
                                <div className="password-field-input">
                                    <input type="password" placeholder="Ít nhất 3 kí tự" className="form-control mt-2" id="password" />
                                    <i className="password-toggle fas fa-eye-slash"></i>
                                </div>
                                <div className="divider-nospace"></div>
                            </div>
                            <div className="form-group">
                                <div className="form-check checkbox-text">
                                    <span>
                                        <input type="checkbox" className="form-check-input" id="remember" />
                                        <label className="form-check-label text-start" htmlFor="remember">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </span>
                                    <a href="#" className="register-link">Quên mật khẩu</a>
                                </div>
                            </div>
                            <div className="form-group">
                                <select name="" className="form-control access-right">
                                    <option selected disabled>Quyền đăng nhập</option>
                                    <option>Người dùng</option>
                                    <option>Quản trị viên</option>
                                </select>
                            </div>
                            <button type="button" className="login-button">Đăng nhập</button>
                            <div className="divider"></div>
                            <div className="text-center">Bạn chưa có tài khoản?
                                <span><a href="#" className="register-link">Tạo tài khoản</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="p-3 p-md-4 p-xl-5">
                <Container id="login">
                    <Row>
                        <Col xs={12} md={6} className="bsb-tpl-bg-platinum">
                            <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
                                <h3 className="m-0">Welcome!</h3>
                                <img className="img-fluid rounded mx-auto my-4" loading="lazy" src={require("../../../assets/img/login.jpg")} width="100%" height="100%" alt="BootstrapBrain Logo" />
                                <p className="mb-0">Not a member yet? <Link to="/register" className="link-secondary text-decoration-none">Register now</Link></p>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className="bsb-tpl-bg-lotion">
                            <div className="p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            <h3>Log in</h3>
                                        </div>
                                    </div>
                                </div>
                                <Form>
                                    <Row className="gy-3 gy-md-4 overflow-hidden">
                                        <Col xs={12}>
                                            <Form.Label htmlFor="phone">Phone <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="phone" name="phone" id="phone" required />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Label htmlFor="password">Password <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="password" name="password" id="password" required />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Check type="checkbox" id="remember_me" label="Keep me logged in" />
                                        </Col>
                                        <Col xs={12}>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">Log in now</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="text-end">
                                            <a href="#!" className="link-secondary text-decoration-none">Forgot password</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mt-5 mb-4">Or sign in with</p>
                                        <div className="d-flex gap-3 flex-column flex-xl-row">
                                            <Button variant="outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Google</span>
                                            </Button>
                                            <Button variant="outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Facebook</span>
                                            </Button>
                                            <Button variant="outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Twitter</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Login
