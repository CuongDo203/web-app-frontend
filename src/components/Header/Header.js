import React from 'react'
// import styles from './header.module.css'
import './header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    // return (
    //     <header>
    //         <nav className="navbar navbar-expand-lg navbar-light bg-dark">
    //             <div className="container">
    //                 <a className="navbar-brand" href="#">
    //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
    //                         <circle cx="50" cy="50" r="45" fill="rgb(240, 101, 197)" />
    //                         <circle cx="50" cy="50" r="35" fill="rgb(127, 68, 255)" />
    //                     </svg>
    //                 </a>
    //                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    //                     aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //                     <span className="navbar-toggler-icon"></span>
    //                 </button>
    //                 <div className="collapse navbar-collapse" id="navbarNav">
    //                     <ul className="navbar-nav">
    //                         <li className="nav-item">
    //                             <a className="nav-link active" href="#">Trang chủ</a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="#">Thông báo</a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="#">
    //                                 <i className="fas fa-shopping-cart icon"></i>
    //                                 Giỏ hàng
    //                             </a>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link" href="#">Đăng nhập</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     </header>
    // )
    return (
        <Navbar collapseOnSelect expand="lg" bg = "dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Link className='navbar-brand' to="/">Logo</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Trang chủ</Link>
                        <Link className="nav-link" to="/notifiactions">Thông báo</Link>
                        <Link className="nav-link" to="/orders">Giỏ hàng</Link>
                    </Nav>
                    <Nav>
                        <Link className="nav-link" to="/login">Đăng nhập</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
