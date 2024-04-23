import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"
import "./home.css"
import { Button, ButtonGroup, Card, CardText, Col, Row } from "react-bootstrap"

function Home() {
    return (
        <>
            <Header />
            <div id="home">
                <div className="container">
                    <div className="intro_section">
                        <h1>Đây là trang Home</h1>
                        <p>Trang này hiển thị danh sách các sản phẩm kèm ảnh</p>
                        <p>Các bạn có thể chọn sản phẩm và mua hàng tại đây</p>
                    </div>
                    <div className="search_box">
                        <input type="text" className="search-input form-control" placeholder="Tìm sản phẩm" />
                        <select className="form-control product-category">
                            <option defaultValue={this} disabled>Danh mục sản phẩm</option>
                            <option>Đồ điện tử</option>
                            <option>Đồ gia dụng</option>
                            <option>Đồ bánh kẹo</option>
                            <option>Hải sản</option>
                        </select>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="product-item">
                                <div className="card">
                                    <img className="card-img-top" src={require("../../../assets/img/macbookpro.jpg")} alt="Macbook" />
                                    <div className="card-body">
                                        <h5 className="card-title">Product 1</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                                        <p className="product-warranty">Bảo hành: 12 tháng</p>
                                        <p className="product-price">Giá: <del>$600</del> $500 </p>
                                        <div className="product-actions">
                                            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                            <span className="space-x"></span>
                                            <button className="btn btn-success">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="product-item">
                                <div className="card">
                                    <img className="card-img-top" src={require("../../../assets/img/macbookpro.jpg")} alt="Macbook" />
                                    <div className="card-body">
                                        <h5 className="card-title">Product 1</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                                        <p className="product-warranty">Bảo hành: 12 tháng</p>
                                        <p className="product-price">Giá: <del>$600</del> $500 </p>
                                        <div className="product-actions">
                                            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                            <span className="space-x"></span>
                                            <button className="btn btn-success">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="product-item">
                                <div className="card">
                                    <img className="card-img-top" src={require("../../../assets/img/macbookpro.jpg")} alt="Macbook" />
                                    <div className="card-body">
                                        <h5 className="card-title">Product 1</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                                        <p className="product-warranty">Bảo hành: 12 tháng</p>
                                        <p className="product-price">Giá: <del>$600</del> $500 </p>
                                        <div className="product-actions">
                                            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                            <span className="space-x"></span>
                                            <button className="btn btn-success">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="product-item">
                                <div className="card">
                                    <img className="card-img-top" src={require("../../../assets/img/macbookpro.jpg")} alt="Macbook" />
                                    <div className="card-body">
                                        <h5 className="card-title">Product 1</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                                        <p className="product-warranty">Bảo hành: 12 tháng</p>
                                        <p className="product-price">Giá: <del>$600</del> $500 </p>
                                        <div className="product-actions">
                                            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                            <span className="space-x"></span>
                                            <button className="btn btn-success">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="product-item">
                                <div className="card">
                                    <img className="card-img-top" src={require("../../../assets/img/macbookpro.jpg")} alt="Macbook" />
                                    <div className="card-body">
                                        <h5 className="card-title">Product 1</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                                        <p className="product-warranty">Bảo hành: 12 tháng</p>
                                        <p className="product-price">Giá: <del>$600</del> $500 </p>
                                        <div className="product-actions">
                                            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                                            <span className="space-x"></span>
                                            <button className="btn btn-success">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <Row xs={1} md={3} className="g-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Col key={idx}>
                                <Card>
                                    <Card.Img variant="top" src={require("../../../assets/img/macbookpro.jpg")} />
                                    <Card.Body>
                                        <Card.Title>Sản phẩm 1</Card.Title>
                                        <Card.Text>
                                            This is a longer card with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit
                                            longer.
                                        </Card.Text>
                                        <CardText className="product-warranty">
                                            Bảo hành: 12 tháng
                                        </CardText>
                                        <CardText className="product-price">
                                            Giá: <del>$600</del> $500
                                        </CardText>
                                        <div className="product-actions">
                                            <Button variant="primary">Thêm vào giỏ hàng</Button>
                                            <Button variant="success">Mua ngay</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
