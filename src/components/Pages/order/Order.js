import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './order.css';
import {
    Form, Row, Col, FormGroup, FormLabel, FormControl, Button, Table, Image,
    InputGroup, Container, Modal
} from 'react-bootstrap';
import CartService from '../../../services/CartService';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart, placeOrder } from '../../../actions/OrderActions';
import { getUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { ImBin2 } from "react-icons/im";
import { checkValidDiscount, getDiscountsByCategory, getDiscountsByProduct } from '../../../actions/DiscountActions';
import { toast } from 'react-toastify';

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

    // Add state for validation errors
    const [validationErrors, setValidationErrors] = useState({});
    const [discountCode, setDiscountCode] = useState('');

    // Add these states at the top
    const [appliedDiscounts, setAppliedDiscounts] = useState([]);

    // Add these validation functions
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    const validateAddress = (address) => {
        return address.trim().length > 0;
    };

    const validateFullname = (name) => {
        return name.trim().length > 0;
    };

    // Add validation check function
    const validateForm = () => {
        let isValid = true;
        const errors = {};
        console.log('formData: ', formData);
        if (!validateFullname(formData.fullname)) {
            errors.fullname = "Họ tên không được để trống";
            isValid = false;
        }

        if (!validateEmail(formData.email)) {
            errors.email = "Email không hợp lệ";
            isValid = false;
        }

        if (!validateAddress(formData.address)) {
            errors.address = "Địa chỉ không được để trống";
            isValid = false;
        }

        if (!validatePhone(formData.phone_number)) {
            errors.phone = "Số điện thoại không hợp lệ";
            isValid = false;
        }
        setValidationErrors(errors);
        return isValid;
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setProductIdToDelete(id)
        setShow(true)
    };

    const [productIdToDelete, setProductIdToDelete] = useState(null)

    const cartService = new CartService()
    const cart = cartService.getCart()
    const { cartItems } = useSelector(state => state.getProductsInCart)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
    }

    // Add this calculation function
    const calculateTotalWithDiscounts = () => {
        // Calculate product level discounts first
        let productDiscountedTotal = cartItems.reduce((total, item) => {
            let itemPrice = item.product.price * item.quantity;
            
            // Check product-specific discounts first
            const productDiscount = productDiscounts[item.product.id]?.[0];
            if (productDiscount) {
                const discountAmount = productDiscount.is_percentage ? 
                    (itemPrice * productDiscount.discount_value / 100) : 
                    productDiscount.discount_value;
                itemPrice -= discountAmount;
            } 
            // If no product discount, check category discounts
            else {
                const categoryDiscount = categoryDiscounts[item.product.category.id]?.[0];
                if (categoryDiscount) {
                    const discountAmount = categoryDiscount.is_percentage ? 
                        (itemPrice * categoryDiscount.discount_value / 100) : 
                        categoryDiscount.discount_value;
                    itemPrice -= discountAmount;
                }
            }
            
            return total + itemPrice;
        }, 0);

        // Then calculate order level discounts
        const orderDiscounts = appliedDiscounts.filter(d => !d.categoryId && !d.productId);
        const originalTotal = calculateTotal();
        const totalDiscount = appliedDiscounts.reduce((sum, discount) => sum + discount.amount, 0);
        return Math.max(0, originalTotal - totalDiscount);
    };

    const handleDeleteItemInCart = () => {
        cartService.removeFromCart(productIdToDelete)
        setShow(false)
        setProductIdToDelete(null)
    }

    const [categoryDiscounts, setCategoryDiscounts] = useState({});
    const [productDiscounts, setProductDiscounts] = useState({});

    const fetchDiscountsByCategories = async () => {
        // Get unique category IDs
        const categoryIds = [...new Set(cartItems.map(item => item.product.category.id))];
        const discountsByCategory = {};

        // Fetch discounts for each category
        for (const categoryId of categoryIds) {
            const result = await dispatch(getDiscountsByCategory(categoryId));
            if (result.success) {
                discountsByCategory[categoryId] = result.data;
            }
        }
        console.log('discountsByCategory: ', discountsByCategory)
        setCategoryDiscounts(discountsByCategory);
    };

    const fetchDiscountsByProducts = async () => {
        // Get unique product IDs
        const productIds = cartItems.map(item => item.product.id);

        // Fetch discounts for each product
        for (const productId of productIds) {
            const result = await dispatch(getDiscountsByProduct(productId));
            if (result.success) {
                setProductDiscounts({
                    ...productDiscounts,
                    [productId]: result.data
                });
            }
        }
        console.log('productDiscounts: ', productDiscounts)
    }

    useEffect(() => {
        fetchDiscountsByCategories();
        fetchDiscountsByProducts();
    }, [cartItems]);

    useEffect(() => {
        dispatch(getProductsInCart(cart))
    }, [dispatch, cart, productIdToDelete])

    const handleApplyDiscount = async () => {
        try {

            // Validate input
            if (!discountCode.trim()) {
                toast.error('Vui lòng nhập mã giảm giá');
                return;
            }

            // Check if code already applied
            if (appliedDiscounts.some(d => d.code === discountCode)) {
                toast.error('Mã giảm giá này đã được áp dụng');
                return;
            }

            // Validate discount code
            const result = await dispatch(checkValidDiscount(discountCode));

            if (!result.success) {
                toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn');
                return;
            }

            const discount = result.data;
            const orderTotal = calculateTotal();

            // Validate minimum order
            if (discount.min_order_value && orderTotal < discount.min_order_value) {
                toast.error(`Đơn hàng tối thiểu ${discount.min_order_value.toLocaleString()}đ`);
                return;
            }

            // Calculate discount amount
            let discountAmount;
            if (discount.is_percentage) {
                discountAmount = (orderTotal * discount.discount_value) / 100;
                if (discount.max_discount_value) {
                    discountAmount = Math.min(discountAmount, discount.max_discount_value);
                }
            } else {
                discountAmount = discount.discount_value;
            }

            // Add to applied discounts
            setAppliedDiscounts([
                ...appliedDiscounts,
                {
                    code: discount.code,
                    amount: discountAmount,
                    value: discount.discount_value,
                    isPercentage: discount.is_percentage
                }
            ]);

            // Clear input
            setDiscountCode('');
            toast.success('Áp dụng mã giảm giá thành công!');
        } catch (error) {
            console.error('Error applying discount:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Proceed with order submission
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
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
                console.log('orderData: ', orderData)
                const orderId = orderData.id
                // if (validated) {
                if (orderId !== null)
                    navigate(`/order-confirmation/${orderId}`)
                // }
            })
        }
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
                                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                            isInvalid={validationErrors.fullname}
                                            placeholder='Nhập họ và tên'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.fullname || "Vui lòng điền đầy đủ họ tên!"}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl type="email" id="email" required value={formData.email}
                                            isInvalid={validationErrors.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder='Nhập email'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.email || "Vui lòng nhập đúng định dạng email!"}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                                        <FormControl type="text" id="phone" required value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                            isInvalid={validationErrors.phone}
                                            placeholder='Nhập số điện thoại'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.phone || "Vui lòng điền đúng định dạng số điện thoại!"}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                                        <FormControl type="text" id="address" required value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            isInvalid={validationErrors.address}
                                            placeholder='Nhập địa chỉ'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.address || "Vui lòng điền địa chỉ!"}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormLabel htmlFor="note">Ghi chú</FormLabel>
                                        <FormControl type="text" id="note" value={formData.note}
                                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                            placeholder='Ghi chú ...'
                                        />
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
                                {/* <div className="text-end mt-3">
                                    <h4>Tổng giá: ${calculateTotalWithDiscounts()}</h4>
                                </div> */}
                                {/* <div className="mt-3">
                                    <h3 noValidate>Nhập mã giảm giá</h3>
                                    <InputGroup className="mb-3">
                                        <FormControl placeholder="Nhập mã giảm giá" value={discountCode} 
                                            onChange={e => setDiscountCode(e.target.value)}/>
                                        <Button variant="outline-secondary" className='btn btn-gradient'
                                            onClick={handleApplyDiscount} disabled={!discountCode.trim()}>Áp dụng</Button>
                                    </InputGroup>
                                </div> */}
                                <div className="order-summary mt-4">
                                    <div className="price-details p-3 border rounded">
                                        <h4 className="mb-3">Chi tiết thanh toán</h4>

                                        {/* Original Price */}
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Tạm tính:</span>
                                            <span>{calculateTotal().toLocaleString()}đ</span>
                                        </div>

                                        {/* Applied Discounts */}
                                        {appliedDiscounts.length > 0 && (
                                            <div className="discounts-applied mb-2">
                                                <div className="text-muted">Giảm giá áp dụng:</div>
                                                {appliedDiscounts.map((discount, index) => (
                                                    <div key={index} className="d-flex justify-content-between align-items-center mt-1">
                                                        <span className="text-success">
                                                            Mã {discount.code}
                                                            {discount.isPercentage ? ` (-${discount.value}%)` : ''}
                                                        </span>
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-success me-2">
                                                                -{discount.amount.toLocaleString()}đ
                                                            </span>
                                                            <Button
                                                                variant="link"
                                                                className="text-danger p-0"
                                                                onClick={() => {
                                                                    setAppliedDiscounts(appliedDiscounts.filter((_, i) => i !== index));
                                                                }}
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-3">

                                            <InputGroup className="mb-3">
                                                <FormControl placeholder="Nhập mã giảm giá" value={discountCode}
                                                    onChange={e => setDiscountCode(e.target.value)} />
                                                <Button variant="outline-secondary" className='btn btn-gradient'
                                                    onClick={handleApplyDiscount} disabled={!discountCode.trim()}>Áp dụng</Button>
                                            </InputGroup>
                                        </div>

                                        {/* Final Total */}
                                        <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                                            <h5>Tổng cộng:</h5>
                                            <h5 className="text-primary">{calculateTotalWithDiscounts().toLocaleString()}đ</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <Button variant="primary" className='btn btn-gradient'
                                        onClick={(e) => handleSubmit(e)}>Đặt hàng</Button>
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
