import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form, Spinner, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getActiveDiscounts } from "../../../../../actions/DiscountActions";
import { getCategories } from "../../../../../actions/CategoryAction";
import { getProducts } from "../../../../../actions/productActions";
import "./ApplyDiscount.css";
import { toast } from "react-toastify";
import { applyDiscountToCategory, applyDiscountToProduct } from "../../../../../actions/DiscountActions";
import { changePage } from "../../../../../actions/productActions";

// Add this helper function after imports
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

function ApplyDiscount() {
    const dispatch = useDispatch();
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [applyType, setApplyType] = useState("product");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get states from redux store
    const { discounts = [] } = useSelector(state => state.getDiscountsReducer);
    const { products = [] } = useSelector(state => state.getProducts);
    const { categories, currentPage: categoryPage, totalPages: categoryTotalPages } = useSelector(state => state.getCategoryReducer);
    const { currentPage: productPage, limitPerPages, visiblePages, totalPages: productTotalPages } = useSelector(state => state.getProducts);

    // Fetch discounts and items when the page loads
    useEffect(() => {
        fetchData();
    }, [dispatch, applyType, productPage]);

    const handlePageChange = (page) => {
        if (applyType === "product") {
            dispatch(changePage(page));
        }
        else {
            dispatch(getCategories(page));
        }
        setSelectedItems([])
    }

    const fetchData = () => {
        try {
            setIsLoading(true);
            // Fetch active discounts
            dispatch(getActiveDiscounts());
            // Fetch products if applyType is "product"
            if (applyType === "product") {
                dispatch(getProducts("", 0, productPage, limitPerPages));
            }
            else {
                dispatch(getCategories(categoryPage));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyDiscount = async () => {
        if (!selectedDiscount || selectedItems.length === 0) {
            toast.error("Please select a discount and at least one item.");
            return;
        }
        setIsLoading(true);
        try {
            if (applyType === "category") {
                await Promise.all(
                    selectedItems.map(categoryId =>
                        dispatch(applyDiscountToCategory(selectedDiscount, categoryId))
                    )
                );
            } else {
                await Promise.all(
                    selectedItems.map(productId =>
                        dispatch(applyDiscountToProduct(selectedDiscount, productId))
                    )
                );
            }

            toast.success("Discount applied successfully!");
            setSelectedItems([]);
        } catch (error) {
            toast.error("Failed to apply discount");
        }
        setIsLoading(false);
    };

    const handleItemSelection = (itemId) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter(id => id !== itemId);
            }
            return [...prevItems, itemId];
        });
    };

    return (
        <Container fluid className="apply-discount-container p-4">
            <Row className="mb-4">
                <Col>
                    <h2 className="mb-4">Apply Discount</h2>
                    <div className="discount-controls bg-light p-4 rounded shadow-sm">
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Select Discount</Form.Label>
                                    <Form.Select
                                        value={selectedDiscount}
                                        onChange={(e) => setSelectedDiscount(e.target.value)}
                                        className="form-select-custom"
                                    >
                                        <option value="">Choose a discount...</option>
                                        {Array.isArray(discounts) && discounts.map(discount => (
                                            <option key={discount.id} value={discount.id}>
                                                {discount.code} - {discount.is_percentage ?
                                                    `${discount.discount_value}% ` :
                                                    `$${discount.discount_value} `}
                                                ({formatDate(discount.start_date)} - {formatDate(discount.end_date)})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Apply To</Form.Label>
                                    <div className="d-flex gap-3">
                                        {['product', 'category'].map(type => (
                                            <Button
                                                key={type}
                                                variant={applyType === type ? 'primary' : 'outline-primary'}
                                                onClick={() => setApplyType(type)}
                                                className="flex-grow-1 text-capitalize"
                                            >
                                                {type}s
                                            </Button>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className="items-table-container bg-white p-4 rounded shadow-sm">
                        {isLoading ? (
                            <div className="text-center p-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-2">Loading items...</p>
                            </div>
                        ) : (
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applyType === "product" ? (products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedItems.includes(product.id)}
                                                    onChange={() => handleItemSelection(product.id)}
                                                />
                                            </td>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.status}</td>
                                        </tr>
                                    ))) : (
                                        categories.map(category => (
                                            <tr key={category.id}>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={selectedItems.includes(category.id)}
                                                        onChange={() => handleItemSelection(category.id)}
                                                    />
                                                </td>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        ))
                                    )
                                    }
                                </tbody>
                            </Table>
                        )}

                    </div>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col className="text-end">
                    <Button
                        variant="primary"
                        onClick={handleApplyDiscount}
                        disabled={!selectedDiscount || selectedItems.length === 0}
                    >
                        Apply Discount
                    </Button>
                </Col>
            </Row>
            {applyType === "product" ?
                (<Pagination className="d-flex justify-content-center mt-5">
                    <Pagination.First
                        disabled={productPage === 0}
                        onClick={() => handlePageChange(0)}
                    />
                    <Pagination.Prev
                        disabled={productPage === 0}
                        onClick={() => handlePageChange(productPage - 1)}
                    />

                    {visiblePages.map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === productPage}
                            onClick={() => handlePageChange(page)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next
                        disabled={productPage === productTotalPages - 1}
                        onClick={() => handlePageChange(productPage + 1)}
                    />
                    <Pagination.Last
                        disabled={productPage === productTotalPages - 1}
                        onClick={() => handlePageChange(productTotalPages - 1)}
                    />
                </Pagination>) : (
                    <Pagination className="d-flex justify-content-center mt-5">
                        <Pagination.First
                            disabled={categoryPage === 0}
                            onClick={() => handlePageChange(0)}
                        />
                        <Pagination.Prev
                            disabled={categoryPage === 0}
                            onClick={() => handlePageChange(categoryPage - 1)}
                        />

                        {[...Array(categoryTotalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index === categoryPage}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next
                            disabled={categoryPage === categoryTotalPages - 1}
                            onClick={() => handlePageChange(categoryPage + 1)}
                        />
                        <Pagination.Last
                            disabled={categoryPage === categoryTotalPages - 1}
                            onClick={() => handlePageChange(categoryTotalPages - 1)}
                        />
                    </Pagination>
                )
            }
        </Container>
    );
}

export default ApplyDiscount;
