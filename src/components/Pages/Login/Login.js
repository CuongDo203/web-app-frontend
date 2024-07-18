import { useState } from 'react'
import './login.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/authActions'

function Login() {

    const [userLogin, setUserLogin] = useState({
        phone: '',
        password: ''
    })

    const {isAuthenticated, user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(userLogin.phone, userLogin.password))
    }

    if(isAuthenticated) {
        if(user.role.name === "user")
            return <Navigate to="/"/>
        else    
            return <Navigate to="/admin"/>
    }

    return (
        <>
            <section >
                <Container id="login">
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col xs={12} md={6} className="bsb-tpl-bg-lotion">
                            <div className="p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5 align-items-center">
                                            <h3 className='text-center'>Log in</h3>
                                        </div>
                                    </div>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="gy-3 gy-md-4 overflow-hidden">
                                        <Col xs={12}>
                                            <Form.Label htmlFor="phone">Phone <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="phone" name="phone" id="phone" required value={userLogin.phone}
                                            onChange={(e) => setUserLogin({...userLogin, phone: e.target.value})} validations={[]}/>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Label htmlFor="password">Password <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="password" name="password" id="password" required value={userLogin.password}
                                            onChange={(e) => setUserLogin({...userLogin, password: e.target.value})}/>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Check type="checkbox" id="remember_me" label="Keep me logged in" />
                                        </Col>
                                        <Col xs={12}>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" onClick={() => handleSubmit}>Log in now</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-0 d-inline">Not a member yet? <Link to="/register" className="link-secondary text-decoration-none">Register now</Link></p>
                                            <Link to="#!" className="link-secondary text-decoration-none text-end">Forgot password</Link>
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
