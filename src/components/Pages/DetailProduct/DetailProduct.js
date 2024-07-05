import React, { useState } from 'react'
import './detail-product.css'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { thumbnailClick } from '../../../actions/detailProductAction'
import CartService from '../../../services/CartService'

function DetailProduct() {

    const { productImages, currentImageIndex, description, price, id } = useSelector((state) => state.getDetailProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(1)
    const cartService = new CartService()

    // useEffect(() => {
    //     dispatch(getDetailProduct(1))
    // }, [dispatch])


    const handleBuy = () => {
        navigate("#")
    }

    const handleAddToCart = () => {
        cartService.addToCart(id, quantity)
    }

    const handleThumbnailClick = (index) => {
        console.log(index)
        dispatch(thumbnailClick(index))
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    return (
        <>
            <Header />
            <div id="detailProduct" className="container">
                <div className="intro-section">
                    <h1>Đây là trang chi tiết sản phẩm</h1>
                    <p>Sử dụng bootstrap</p>
                </div>
                <div className="row detailSection">
                    <div className="col-md-6">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {productImages.map((productImage, idx) => (
                                    <div className={"carousel-item" + (idx === currentImageIndex ? " active" : "")} key={idx}>
                                        <div className="square-image">
                                            <img src={productImage.image_url} alt="Product" className="product-image" />
                                        </div>
                                    </div>
                                ))}
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
                                {productImages.map((productImage, idx) => (
                                    <div className={"thumbnail-item" + (idx === currentImageIndex ? " active" : "")} key={idx} onClick={() => handleThumbnailClick(idx)}>
                                        <img src={productImage.image_url} alt="Product" className="thumbnail-image" />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-details">
                            <h2>Thông tin chi tiết sản phẩm</h2>
                            <p>Mô tả sản phẩm</p>
                            <p>{description}</p>
                            <p>Giá: ${price}</p>
                            <div className="product-actions">
                                <button className="btn btn-primary" onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</button>
                                <button className="btn btn-success" onClick={() => handleBuy()}>Mua ngay</button>
                            </div>
                            <div className="product-quantity-section">
                                <p className="product-quantity-label">Số lượng</p>
                                <div className="product-quantity">
                                    <div className="border-wrapper">
                                        <button onClick={() => handleDecreaseQuantity()}>-</button>
                                        <input type="text" value={quantity} />
                                        <button onClick={() => handleIncreaseQuantity()}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailProduct
