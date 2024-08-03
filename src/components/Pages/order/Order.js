import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './order.css';
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Button, Table, Image, 
    InputGroup, Container, Modal } from 'react-bootstrap';
import CartService from '../../../services/CartService';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart, placeOrder } from '../../../actions/OrderActions';
import { getUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { ImBin2 } from "react-icons/im";

function Order() {

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        note: '',
        payment_method: 'cod',   //Mặc định là thanh toán khi nhận hàng COD
        shipping_method: 'express',  //Mặc định là giao hàng nhanh
    })

    // const { orderData } = useSelector(state => state.getProductsInCart)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setProductIdToDelete(id)
        // console.log(id)
        setShow(true)
    };

    const [productIdToDelete, setProductIdToDelete] = useState(null)

    const cartService = new CartService()
    const cart = cartService.getCart()
    const { cartItems } = useSelector(state => state.getProductsInCart)
    const { idOrderPlaced } = useSelector(state => state.getProductsInCart)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
    }

    const handleDeleteItemInCart = () => {
        cartService.removeFromCart(productIdToDelete)
        setShow(false)
        setProductIdToDelete(null)
    }

    // const updateCartFromCartItem = () => {
    //     cart.clear()
    //     cartItems.forEach((item) => {
    //         cart.set(item.product.id, item.quantity)
    //     })
    //     cartService.setCart(cart)
    // }

    useEffect(() => {
        dispatch(getProductsInCart(cart))
    }, [dispatch, cart, productIdToDelete])

    // useEffect(() => {
    //     console.log('validated in useeffect: ', validated);
    //     console.log('idOrderPlaced in useeffect: ', idOrderPlaced)
    // }, [validated, idOrderPlaced]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setValidated(true);
        const data = { ...formData }
        data.user_id = getUser().id;
        data.cart_items = cartItems.map(cartItem => ({
            product_id: cartItem.product.id,
            quantity: cartItem.quantity
        }));
        data.total_money = calculateTotal()
        dispatch(placeOrder(data)).then((orderData) => {
            cartService.clearCart()
            const orderId = orderData.id
            console.log('idOrderPlaced: ', orderId)
            console.log('validate: ', validated)
            // if (validated) {
            if(orderId !== null)
                navigate(`/order-confirmation/${orderId}`)
            // }
        })
    };

    return (
        <>
            <Header />
            <div style={{ position: 'relative' }}>
                <div id="order" className="container">
                    <div className="intro-section">
                        <h2>Đây là trang Order</h2>
                        <p>Mọi sản phẩm trong giỏ hàng của bạn đều ở đây</p>
                    </div>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md={5}>
                                <h2 className="product-header">Thông tin người nhận</h2>
                                <Form noValidate validated={validated}>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="name">Họ và tên</FormLabel>
                                        <FormControl type="text" id="name" required value={formData.fullname}
                                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng điền đầy đủ họ tên!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl type="email" id="email" required value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập đúng định dạng email!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                                        <FormControl type="text" id="phone" required value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng điền đầy đủ số điện thoại!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                                        <FormControl type="text" id="address" required value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập địa chỉ!
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="note">Ghi chú</FormLabel>
                                        <FormControl type="text" id="note" value={formData.note}
                                            onChange={(e) => setFormData({ ...formData, note: e.target.value })} />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="shipping_method">Phương thức vận chuyển</FormLabel>
                                        <FormControl as="select" id="shipping_method"
                                            onChange={(e) => setFormData({ ...formData, shipping_method: e.target.value })}>
                                            <option value="express">Nhanh (Express)</option>
                                            <option value="normal">Thường (Normal)</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="payment_method">Phương thức thanh toán</FormLabel>
                                        <FormControl as="select" id="payment_method"
                                            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}>
                                            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                            <option value="others">Thanh toán khác</option>
                                        </FormControl>
                                    </FormGroup>

                                </Form>
                            </Col>
                            <Col md={7}>
                                <h2 className="product-order">Sản phẩm đã đặt hàng</h2>
                                <Table responsive="md" bordered hover variant='dark'>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Tổng giá</th>
                                            <th></th>
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
                                                <td><Button variant="danger" onClick={() => handleShow(item.product.id)}><ImBin2 /> Xóa</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="text-end mt-3">
                                    <h4>Tổng giá: ${calculateTotal()}</h4>
                                </div>
                                <div className="mt-3">
                                    <h3 noValidate>Nhập coupon</h3>
                                    <InputGroup className="mb-3">
                                        <FormControl placeholder="Nhập coupon" />
                                        <Button variant="outline-secondary" className='btn btn-gradient'>Áp dụng</Button>
                                    </InputGroup>
                                </div>
                                <div className="text-center mt-5">
                                    <Button variant="primary" className='btn btn-gradient' onClick={(e) => handleSubmit(e)}>Đặt hàng</Button>
                                </div>
                            </Col>
                        </Row>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác nhận xóa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Hủy
                                </Button>
                                <Button variant="primary" onClick={() => handleDeleteItemInCart()}>
                                    Xóa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Order
