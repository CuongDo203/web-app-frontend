import React, { useEffect } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import './orderConfirm.css'
import CartService from '../../../services/CartService'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart } from '../../../actions/OrderActions'

function OrderConfirm() {

  const cartService = new CartService()
  const { cartItems } = useSelector(state => state.getProductsInCart)
  const dispatch = useDispatch();
  const cart = cartService.getCart()
  
  useEffect(() => {
    dispatch(getProductsInCart(cart))
  }, [dispatch, cart])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
  }

  return (
    <>
      <Header />
      <div id="orderConfirm" className="container">
        <div className="confirmation-container">
          <h1>Xác nhận đơn hàng</h1>
          <p>Cảm ơn bạn đã đặt hàng! Dưới đây là thông tin chi tiết về đơn hàng của bạn.</p>
        </div>
        <div className="row">
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
          <div className="text-center mt-4">
            <button className="btn btn-gradient" type="button">Thanh toán</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OrderConfirm
