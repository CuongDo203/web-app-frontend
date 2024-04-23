import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import './orderConfirm.css'

function OrderConfirm() {
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
              <tr>
                <td>
                  <div className="product-info">
                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image"/>
                      <span className="product-name">Macbook pro 2023</span>
                  </div>
                </td>
                <td>2</td>
                <td>$500</td>
                <td>$1000</td>
              </tr>
              <tr>
                <td>
                  <div className="product-info">
                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image"/>
                      <span className="product-name">Macbook M1</span>
                  </div>
                </td>
                <td>2</td>
                <td>$500</td>
                <td>$1000</td>
              </tr>

            </tbody>
          </table>
          <div className="text-center mt-4">
            <button className="btn btn-gradient" type="button">Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OrderConfirm
