import React from 'react'
import './Admin.css'
import { NavDropdown, Container, Nav, Row, Col, NavItem } from 'react-bootstrap'
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import { tokenVerify } from '../../../services/tokenService';


function Admin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const handleTabClick = (tab) => {
        navigate(`/admin/${tab}`)
    }

    if (!tokenVerify()) {
        return <Navigate to="/login" />;
    }

    return (
        <Container fluid className='admin-page'>
            <Row>
                <div className='col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100 sidebar'>
                    <div className='mt-2'>
                        <Nav.Link className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline' role='button'>
                            <span className='f5-4'>Side Menu</span>
                        </Nav.Link>
                        <hr className='text-white d-none d-sm-block'></hr>
                        <ul className="nav nav-pills flex-column mt-2 mt-sm-0">
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" aria-current="page"
                                    onClick={() => handleTabClick("order")}>
                                    <i ><BsCartCheckFill /></i>
                                    <span className='ms-2 d-none d-sm-inline'>Orders</span>
                                </Nav.Link>
                            </li>
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" aria-current="page"
                                    onClick={() => handleTabClick("product")}>
                                    <i ><FaCreditCard /></i>
                                    <span className='ms-2 d-none d-sm-inline'>Products</span>
                                </Nav.Link>
                            </li>
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" aria-current="page"
                                    onClick={() => handleTabClick("category")}>
                                    <i ><AiFillProduct /></i>
                                    <span className='ms-2 d-none d-sm-inline'>Categories</span>
                                </Nav.Link>
                            </li>
                        </ul>

                    </div>
                    <div className="dropdown open mb-2">
                        <NavItem
                            className="btn border-none dropdown-toggle text-white"
                            type="button"
                            id="triggerId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className='bi bi-person f5-4'><FaUserCircle id='user-icon' /></i>
                            <span className='fs-5 ms-3 d-none d-sm-inline'>Admin</span>
                        </NavItem>

                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <NavDropdown.Item className="dropdown-item" href="#">
                                <ImProfile style={{ marginRight: "5px" }} />
                                <span className='fs-5 ms-3 d-none d-sm-inline'>Profile</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item" onClick={() => handleLogout()}>
                                <RiLogoutBoxRLine style={{ marginRight: "5px" }} />
                                <span className='fs-5 ms-3 d-none d-sm-inline'>Logout</span>
                            </NavDropdown.Item>
                        </div>
                    </div>
                </div>
                <Col >
                    <div id='admin-page-wrapper'>
                        <Row className='content'>
                            <Outlet />
                        </Row>
                    </div>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Admin
