import React, { useState } from 'react'
import './Admin.css'
import { NavDropdown, Container, Row, Col, Button } from 'react-bootstrap'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import OrderTable from './OrderTable';
import ProductTable from './ProductTable'
import CategoryTable from './CategoryTable'


function Admin() {

    const [showPage, setShowPage] = useState("order")

    const renderContent = () => {
        switch (showPage) {
            case "product":
                return <ProductTable />;
            case "category":
                return <CategoryTable />;
            default:
                return <OrderTable />;
        }
    };

    return (
        <Container fluid className='admin-page'>
            <Row>
                <Col md lg="2" className='sidebar'>
                    <div className='sidebar-collapse'>
                        <ul id='side-menu'>
                            <li className='nav-header'>
                                <h2>Admin</h2>
                            </li>
                            <li>
                                <a onClick={() => setShowPage("order")}>Orders</a>
                            </li>
                            <li>
                                <a onClick={() => setShowPage("category")}>Categories</a>
                            </li>
                            <li>
                                <a onClick={() => setShowPage("product")}>Products</a>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col >
                    <div id='admin-page-wrapper'>
                        <Row className='dashboard-header'>
                            <Col lg={10}>
                                <h3>Welcome back, Admin!</h3>
                            </Col>
                            <Col lg={1} className='notification-col'>
                                <Button size='lg'><IoNotificationsOutline /></Button>
                            </Col>
                            <Col lg={1}>
                                <NavDropdown size='lg' title={<FaUserCircle id='user-icon' />} id="basic-nav-dropdown">
                                    <NavDropdown.Item><RiLogoutBoxRLine style={{ marginRight: "5px" }} />Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                        </Row>
                        <Row className='content'>
                            {renderContent()}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin
