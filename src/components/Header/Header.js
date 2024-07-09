import React, { useState } from 'react'
// import styles from './header.module.css'
import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Header() {
    
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [activeNavItem, setActiveNavItem] = useState(0)

    const handleLogout = () => {
        dispatch(logout())
    }

    const onChangeActiveItem = (index) => {
        setActiveNavItem(index)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Link className='navbar-brand' to="/">Logo</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={`nav-link ${(activeNavItem === 0) ? "isActive" : ""}`} 
                            onClick={() => onChangeActiveItem(0)}
                            to="/">Trang chủ</Link>
                        <Link className={`nav-link ${(activeNavItem === 1) ? "isActive" : ""}`} 
                            onClick={() => onChangeActiveItem(1)}
                            to="/notifications">Thông báo</Link>
                        <Link className={`nav-link ${(activeNavItem === 2) ? "isActive" : ""}`} 
                            onClick={() => onChangeActiveItem(2)}
                            to="/orders">Giỏ hàng</Link>
                    </Nav>
                    <Nav>
                        {user === null ? (<Link className="nav-link" to="/login">Đăng nhập</Link>) : 
                        (
                            <NavDropdown title={"user"} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Tài khoản của tôi</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Đơn mua</NavDropdown.Item>
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
