import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import './order.css'

function Order() {
    return (
        <div style={{height: '100vh', position: 'relative'}}>
            <Header />
            <div className="container">
                <div className="intro-section">
                    <h1>Đây là trang Order</h1>
                    <p>Sử dụng bootstrap</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="product-header">Thông tin người nhận</h2>
                        <form action="">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Họ và tên</label>
                                <input type="text" className="form-control" id="name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" id="phone"/>
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
                                <tr>
                                    <td>
                                        <div className="product-info">
                                            <img src="./assets/image/macbookpro.jpg" alt="Product image" className="product-image"/>
                                                <span className="product-name">Tên sản phẩm</span>
                                        </div>
                                    </td>
                                    <td>2</td>
                                    <td>$500</td>
                                    <td>$1000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="product-info">
                                            <img src="./assets/image/macbookpro.jpg" alt="Product image" className="product-image"/>
                                                <span className="product-name">Tên sản phẩm</span>
                                        </div>
                                    </td>
                                    <td>2</td>
                                    <td>$500</td>
                                    <td>$1000</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-start mt-3">
                            <h4 className="header-text text-end">Tổng giá: $2000</h4>
                        </div>
                        <div className="mt-3">
                            <div className="product-header">Nhập coupon</div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Nhập coupon"/>
                                    <button className="btn btn-gradient" type="button">Áp dụng</button>
                            </div>
                        </div>
                        <div className="text-start mt-3">
                            <button className="btn btn-gradient" type="button">Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Order
