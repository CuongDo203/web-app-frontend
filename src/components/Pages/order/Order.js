import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './order.css';
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Button, Table, Image, InputGroup } from 'react-bootstrap';
import CartService from '../../../services/CartService';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart } from '../../../actions/OrderActions';

function Order() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const cartService = new CartService()
    const { cartItems } = useSelector(state => state.getProductsInCart)
    const dispatch = useDispatch();
    const cart = cartService.getCart()

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
    }

    useEffect(() => {
        dispatch(getProductsInCart(cart))
    }, [dispatch, cart])

    return (
        <>
            <Header />
            <div style={{ position: 'relative' }}>
                <div id="order" className="container">
                    <div className="intro-section">
                        <h2>Đây là trang Order</h2>
                        <p>Sử dụng bootstrap</p>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <h2 className="product-header">Thông tin người nhận</h2>
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Họ và tên</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                    <input type="text" className="form-control" id="phone" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                                    <input type="text" className="form-control" id="address" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="note" className="form-label">Ghi chú</label>
                                    <input type="text" className="form-control" id="note" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="shipping_method" className="form-label">Phương thức vận chuyển</label>
                                    <select id='shipping_method' className='form-control'>
                                        <option value={"express"}>Nhanh (Express)</option>
                                        <option value={"normal"}>Thường (Normal)</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="payment_method" className="form-label">Phương thức thanh toán</label>
                                    <select id='payment_method' className='form-control'>
                                        <option value={"express"}>Thanh toán khi nhận hàng (COD)</option>
                                        <option value={"normal"}>Thanh toán khác</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <h2 className="product-order">Sản phẩm đã đặt hàng</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-start">Sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Tổng giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className="product-info">
                                                    <img src={item.product.thumbnail} alt="Product" className="product-image" />
                                                    <span className="product-name">{item.product.name}</span>
                                                </div>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>${item.product.price}</td>
                                            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-start mt-3">
                                <h4 className="header-text text-end">Tổng giá: ${calculateTotal()}</h4>
                            </div>
                            <div className="mt-3">
                                <h3 className="product-header">Nhập coupon</h3>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Nhập coupon" />
                                    <button className="btn btn-gradient" type="button">Áp dụng</button>
                                </div>
                            </div>
                            <div className="text-start mt-3">
                                <button className="btn btn-gradient" type="button">Đặt hàng</button>
                            </div>
                        </div>
                    </div> */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="justify-content-md-center">
                            <Col md={6}>
                                <h2 className="product-header">Thông tin người nhận</h2>
                                <Form>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="name">Họ và tên</FormLabel>
                                        <FormControl type="text" id="name" required />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng điền đầy đủ họ tên!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl type="text" id="email" />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                                        <FormControl type="text" id="phone" required />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng điền đầy đủ số điện thoại!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                                        <FormControl type="text" id="address" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập địa chỉ!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="note">Ghi chú</FormLabel>
                                        <FormControl type="text" id="note" />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="shipping_method">Phương thức vận chuyển</FormLabel>
                                        <FormControl as="select" id="shipping_method">
                                            <option value="express">Nhanh (Express)</option>
                                            <option value="normal">Thường (Normal)</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="payment_method">Phương thức thanh toán</FormLabel>
                                        <FormControl as="select" id="payment_method">
                                            <option value="express">Thanh toán khi nhận hàng (COD)</option>
                                            <option value="normal">Thanh toán khác</option>
                                        </FormControl>
                                    </FormGroup>

                                </Form>
                            </Col>
                            <Col md={6}>
                                <h2 className="product-order">Sản phẩm đã đặt hàng</h2>
                                <Table responsive="md" bordered hover variant='dark'>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Tổng giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <div className="product-info">
                                                        <Image src={item.product.thumbnail} alt="Product" className="product-image" />
                                                        <span className="product-name">{item.product.name}</span>
                                                    </div>
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>${item.product.price}</td>
                                                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="text-end mt-3">
                                    <h4>Tổng giá: ${calculateTotal()}</h4>
                                </div>
                                <div className="mt-3">
                                    <h3>Nhập coupon</h3>
                                    <InputGroup className="mb-3">
                                        <FormControl placeholder="Nhập coupon" />
                                        <Button variant="outline-secondary" className='btn btn-gradient'>Áp dụng</Button>
                                    </InputGroup>
                                </div>
                                <div className="text-start mt-3">
                                    <Button variant="primary" className='btn btn-gradient' onClick={(e) => handleSubmit(e)}>Đặt hàng</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Order
