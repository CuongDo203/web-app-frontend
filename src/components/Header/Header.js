import React, { useEffect, useState } from 'react'
import './header.css'
import { FiShoppingCart } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { getUser } from '../../services/authService';

// Remove the getActiveNavItem function and simplify the navigation state management
function Header() {
    const user = getUser()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    
    // Directly derive active state from location
    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const switchToProfile = () => {
        const userId = user.id
        navigate(`/user-profile/${userId}`)
    }

    const switchToMyOrders = () => {    
        const userId = user.id
        navigate(`/my-orders/${userId}`)
    }

    return (
        <Navbar 
            collapseOnSelect 
            expand="lg" 
            bg="dark" 
            data-bs-theme="dark" 
            className="bg-body-tertiary"
            fixed="top"
        >
            <Container>
                <Link className='navbar-brand' to="/">Logo</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={`nav-link d-flex align-items-center ${isActive('/') ? "isActive" : ""}`}
                            to="/"><IoHome /> <span>Trang chủ</span></Link>
                        <Link className={`nav-link d-flex align-items-center ${isActive('/notifications') ? "isActive" : ""}`}
                            to="/notifications"><IoMdNotificationsOutline /> <span>Thông báo</span></Link>
                        <Link className={`nav-link d-flex align-items-center ${isActive('/orders') ? "isActive" : ""}`}
                            to="/orders"><FiShoppingCart /> <span>Giỏ hàng</span></Link>
                    </Nav>
                    <Nav>
                        {user === null ? (
                            <Link className="nav-link" to="/login">Đăng nhập</Link>
                        ) : (
                            <NavDropdown 
                                title={<FaUserCircle id='user-icon' />} 
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item onClick={() => switchToProfile()}>Tài khoản của tôi</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => switchToMyOrders()}>Đơn mua</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
