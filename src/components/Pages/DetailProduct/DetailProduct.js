import React from 'react'
import './detail-product.css'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { useNavigate } from 'react-router-dom'

function DetailProduct() {

    const navigate = useNavigate()

    const handleBuy = () => {
        navigate("#")
    }

    return (
        <>
            <Header/>
            <div id="detailProduct" className="container">
                <div className="intro-section">
                    <h1>Đây là trang chi tiết sản phẩm</h1>
                    <p>Sử dụng bootstrap</p>
                </div>
                <div className="row detailSection">
                    <div className="col-md-6">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="square-image">
                                        <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image" />
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <div className="square-image">
                                        <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image" />
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <div className="square-image">
                                        <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image" />
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <div className="square-image">
                                        <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image" />
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <div className="square-image">
                                        <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="product-image" />
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="row">
                            <div className="thumbnail-container">
                                <div className="thumbnail-item active">
                                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="thumbnail-image" />
                                </div>
                                <div className="thumbnail-item">
                                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="thumbnail-image" />
                                </div>
                                <div className="thumbnail-item">
                                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="thumbnail-image" />
                                </div>
                                <div className="thumbnail-item">
                                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="thumbnail-image" />
                                </div>
                                <div className="thumbnail-item">
                                    <img src={require("../../../assets/img/macbookpro.jpg")} alt="Product image" className="thumbnail-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-details">
                            <h2>Thông tin chi tiết sản phẩm</h2>
                            <p>Mô tả sản phẩm</p>
                            <p>Giá: $500</p>
                            <div className="product-actions">
                                <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                <button className="btn btn-success" onClick={handleBuy}>Mua ngay</button>
                            </div>
                            <div className="product-quantity-section">
                                <p className="product-quantity-label">Số lượng</p>
                                <div className="product-quantity">
                                    <div className="border-wrapper">
                                        <button>-</button>
                                        <input type="text" value="1" />
                                        <button>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default DetailProduct
