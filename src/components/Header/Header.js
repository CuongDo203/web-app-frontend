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

function Header() {

    const user = getUser()
    const dispatch = useDispatch()
    const [activeNavItem, setActiveNavItem] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const switchToProfile = () => {
        const userId = user.id
        navigate(`/user-profile/${userId}`)
    }

    const getActiveNavItem = (path) => {
        if (path === '/') {
            return 0;
        } else if (path === '/notifications') {
            return 1;
        } else if (path === '/orders') {
            return 2;
        }
        return 0;
    };

    useEffect(() => {
        const newActiveNavItem = getActiveNavItem(location.pathname);
        setActiveNavItem(newActiveNavItem);
    }, [location]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Link className='navbar-brand' to="/">Logo</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={`nav-link ${activeNavItem === 0 ? "isActive" : ""}`}
                            to="/"><IoHome /> Trang chủ</Link>
                        <Link className={`nav-link ${activeNavItem === 1 ? "isActive" : ""}`}
                            to="/notifications"><IoMdNotificationsOutline /> Thông báo</Link>
                        <Link className={`nav-link ${activeNavItem === 2 ? "isActive" : ""}`}
                            to="/orders"><FiShoppingCart /> Giỏ hàng</Link>
                    </Nav>
                    <Nav>
                        {user === null ? (<Link className="nav-link" to="/login">Đăng nhập</Link>) :
                            (
                                <NavDropdown title={<FaUserCircle id='user-icon' />} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => switchToProfile()}>Tài khoản của tôi</NavDropdown.Item>
                                    <NavDropdown.Item >Đơn mua</NavDropdown.Item>
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
