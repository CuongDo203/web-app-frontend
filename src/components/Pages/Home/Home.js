import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"
import "./home.css"
import { FaSearch } from "react-icons/fa";
import { Button, Card, CardText, Col, Row, Pagination, Form, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, changePage, getCategories } from "../../../actions/productActions";
import { useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getDetailProduct } from '../../../actions/detailProductAction'
import { tokenVerify } from "../../../services/tokenService";

function Home() {

    const { categories, products, totalPages, currentPage, visiblePages, limitPerPages, keyword, categoryId } = useSelector(
        (state) => state.getProducts
    );
    const {isAuthenticated} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate() 

    const [textVal, setTextVal] = useState('')
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

    useEffect(() => {
        dispatch(getProducts(keyword, categoryId, currentPage, limitPerPages));
        dispatch(getCategories())
    }, [currentPage, limitPerPages, categoryId, keyword, dispatch])

    const onPageChange = (page) => {
        dispatch(changePage(page))
    }

    const getDetailClick = (id) => {
        dispatch(getDetailProduct(id))
        navigate(`/product-detail/${id}`)
    }

    const onSelectedCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value)
    }

    const searchProducts = () => {
        dispatch(getProducts(textVal, selectedCategoryId, 0, limitPerPages))
    }

    if(!tokenVerify()) {
        return <Navigate to="/login" />;
    }

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

                    <div className="mb-5">
                        <InputGroup className="d-flex justify-content-center">
                            <Row>
                                <Col md>
                                    <FormControl type="text" placeholder="Tìm sản phẩm" value={textVal}
                                    onChange={(e) => setTextVal(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Select onChange={(e) => onSelectedCategoryChange(e)}>
                                        <option value={0}>Tất cả</option>
                                        {categories.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
                                    </Form.Select>
                                </Col>
                                <Col md>
                                    <Button variant="primary" onClick={() => searchProducts()}>Tìm kiếm <FaSearch /></Button>
                                </Col>
                            </Row>
                        </InputGroup>

                    </div>

                    <Row xs={1} md={3} className="g-4">
                        {products.map((product, idx) => (
                            <Col key={idx}>
                                <Card>
                                    {/* <Card.Img variant="top" src={require("../../../assets/img/macbookpro.jpg")} /> */}
                                    <Card.Img variant="top" src={product.url} onClick={() => getDetailClick(product.id)}/>
                                    <Card.Body>
                                        <Card.Title onClick={() => getDetailClick(product.id)}>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                        <CardText className="product-warranty">
                                            Bảo hành: 12 tháng
                                        </CardText>
                                        <CardText className="product-price">
                                            Giá: ${product.price}
                                        </CardText>
                                        {/* <div className="product-actions">
                                            <Button variant="primary">Thêm vào giỏ hàng</Button>
                                            <Button variant="success">Mua ngay</Button>
                                        </div> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.First onClick={() => onPageChange(0)} />
                    <Pagination.Prev disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)} />
                    {visiblePages.map((page, idx) => (
                        <Pagination.Item key={idx} active={page === currentPage} onClick={() => onPageChange(page)}>{page + 1}</Pagination.Item>
                    ))}
                    <Pagination.Ellipsis disabled />
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
                    <Pagination.Last onClick={() => onPageChange(totalPages - 1)} />
                </Pagination>
            </div>
            <Footer />
        </>
    )
}

export default Home
