import React, { useState } from 'react'
import './Admin.css'
import { NavDropdown, Container, Nav, Row, Col, NavItem } from 'react-bootstrap'
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRLine, RiPriceTag3Line } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import { tokenVerify } from '../../../services/tokenService';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);

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
                <div className={`col-auto bg-dark d-flex flex-column justify-content-between min-vh-100 sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <div className='mt-2'>
                        <div className="d-flex justify-content-between align-items-center px-3">
                            <Nav.Link className={`text-decoration-none ms-4 d-flex align-items-center text-white ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>
                                <span className='f5-4'>Logo</span>
                            </Nav.Link>
                            <button 
                                className="toggle-btn btn-link text-white"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
                            </button>
                        </div>
                        <hr className={`text-white ${isCollapsed ? 'd-none' : 'd-none d-sm-block'}`} />
                        <ul className="nav nav-pills flex-column mt-2 mt-sm-0">
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" onClick={() => handleTabClick("order")}>
                                    <i><BsCartCheckFill /></i>
                                    <span className={`ms-2 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Orders</span>
                                </Nav.Link>
                            </li>
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" onClick={() => handleTabClick("product")}>
                                    <i><FaCreditCard /></i>
                                    <span className={`ms-2 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Products</span>
                                </Nav.Link>
                            </li>
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" onClick={() => handleTabClick("category")}>
                                    <i><AiFillProduct /></i>
                                    <span className={`ms-2 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Categories</span>
                                </Nav.Link>
                            </li>
                            <li className="nav-item my-1 py-2 py-sm-0">
                                <Nav.Link className="nav-link text-white text-start text-small-start" onClick={() => handleTabClick("discount")}>
                                    <i><RiPriceTag3Line /></i>
                                    <span className={`ms-2 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Discounts</span>
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
                            <span className={`fs-5 ms-3 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Admin</span>
                        </NavItem>

                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <NavDropdown.Item className="dropdown-item" href="#">
                                <ImProfile style={{ marginRight: "5px" }} />
                                <span className={`fs-5 ms-3 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Profile</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item" onClick={() => handleLogout()}>
                                <RiLogoutBoxRLine style={{ marginRight: "5px" }} />
                                <span className={`fs-5 ms-3 ${isCollapsed ? 'd-none' : 'd-none d-sm-inline'}`}>Logout</span>
                            </NavDropdown.Item>
                        </div>
                    </div>
                </div>
                <div className={`col  ${isCollapsed ? 'content-expanded' : 'content'}`}>
                    <div id='admin-page-wrapper'>
                        <Row >
                            <Outlet />
                        </Row>
                    </div>
                </div>
            </Row>
            
        </Container>
    )
}

export default Admin
