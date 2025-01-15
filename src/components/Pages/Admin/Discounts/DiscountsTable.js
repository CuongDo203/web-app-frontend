import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscounts, addDiscount, deleteDiscount, updateDiscount } from '../../../../actions/DiscountActions';
import { useNavigate } from 'react-router-dom';
import { changePage } from '../../../../actions/DiscountActions';
import { toast } from 'react-toastify';
import './DiscountsTable.css';

function DiscountsTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { discounts, loading, currentPage, totalPages } = useSelector(state => state.getDiscountsReducer || {
        discounts: [],
        loading: false,
        currentPage: 0,
        totalPages: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        discount_value: 0,
        is_percentage: false,
        min_order_value: 0,
        max_discount_value: null,
        start_date: '',
        end_date: '',
        usage_limit: 0,
        per_user_limit: null
    });

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        sortBy: 'id',
        sortDirection: 'asc'
    });

    const handleSort = (field) => {
        const newDirection = filters.sortBy === field && filters.sortDirection === 'asc' ? 'desc' : 'asc';
        setFilters({
            ...filters,
            sortBy: field,
            sortDirection: newDirection
        });
        dispatch(getDiscounts(currentPage, 10, field, newDirection));
    };

    const handleDateFilter = (field, value) => {
        setFilters(prev => ({
            ...filters,
            [field]: value
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            sortBy: 'id',
            sortDirection: 'asc'
        });
        dispatch(getDiscounts(0, 10, 'id', 'asc'));
    };

    // Fetch discounts when component mounts
    useEffect(() => {
        console.log('Filters changed:', filters); // Debug log
        dispatch(getDiscounts(
            currentPage,
            10,
            filters.sortBy,
            filters.sortDirection,
            filters.startDate, // Pass start date
            filters.endDate    // Pass end date
        ));
    }, [dispatch, currentPage, filters]); // Add filters to dependency array

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this discount?')) {
            const result = await dispatch(deleteDiscount(id));

            if (result.success) {
                toast.success('Discount deleted successfully');
                dispatch(getDiscounts()); // Refresh list
            } else {
                toast.error(result.error || 'Failed to delete discount');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.code || !formData.discount_value) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            let result;
            if (editingDiscount) {
                // Update existing discount
                result = await dispatch(updateDiscount(editingDiscount.id, formData));
            } else {
                // Create new discount
                result = await dispatch(addDiscount(formData));
            }

            if (result.success) {
                toast.success(`Discount ${editingDiscount ? 'updated' : 'added'} successfully`);
                setShowModal(false);
                setFormData({
                    code: '',
                    name: '',
                    discount_value: 0,
                    is_percentage: false,
                    min_order_value: 0,
                    max_discount_value: null,
                    start_date: '',
                    end_date: '',
                    usage_limit: 0,
                    per_user_limit: null
                });
                setEditingDiscount(null);
                dispatch(getDiscounts(currentPage, 10, filters.sortBy, filters.sortDirection, null, null)); // Refresh list
            } else {
                toast.error(result.error || `Failed to ${editingDiscount ? 'update' : 'add'} discount`);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const handlePageChange = (page) => {
        dispatch(changePage(page));
        dispatch(getDiscounts(page, 10, filters.sortBy, filters.sortDirection, filters.startDate, filters.endDate));
    };

    return (
        <div className="p-4 discounts-table-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Discount Management</h2>
                <div className="d-flex gap-3">
                    <Button 
                        variant="outline-primary"
                        onClick={() => navigate('apply-discount')}
                    >
                        <i className="fas fa-tag me-2"></i>
                        Apply Discount
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                            setEditingDiscount(null);
                            setShowModal(true);
                        }}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Add New Discount
                    </Button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-4 p-3 filter-section border rounded bg-light">
                <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-secondary fw-bold mb-2">Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleDateFilter('startDate', e.target.value)}
                                max={filters.endDate || new Date().toISOString().split('T')[0]}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-secondary fw-bold mb-2">End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleDateFilter('endDate', e.target.value)}
                                min={filters.startDate}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-secondary fw-bold mb-2">Sort By</Form.Label>
                            <Form.Select
                                value={filters.sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                style={{
                                    height: '48px',
                                }}
                            >
                                <option value="id">ID</option>
                                <option value="code">Code</option>
                                <option value="discount_value">Value</option>
                                <option value="start_date">Start Date</option>
                                <option value="end_date">End Date</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                        <Button
                            variant="outline-secondary"
                            onClick={handleResetFilters}
                            className='px-4 py-2 rounded-pill'
                            style={{
                                transition: 'all 0.3s ease',
                                borderWidth: '2px'
                            }}
                        >
                            <i className="fas fa-undo-alt me-2"></i>
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border text-secondary mb-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading discounts...</div>
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={() => handleSort('code')} style={{ cursor: 'pointer' }}>
                                Code {filters.sortBy === 'code' && (
                                    <i className={`fas fa-sort-${filters.sortDirection}`}></i>
                                )}
                            </th>
                            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                Name {filters.sortBy === 'name' && (
                                    <i className={`fas fa-sort-${filters.sortDirection}`}></i>
                                )}
                            </th>
                            <th>Value</th>
                            <th>Min Order</th>
                            <th>Max Discount</th>
                            <th>Valid Period</th>
                            <th>Usage Limit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount, index) => (
                            <tr key={discount.id}>
                                <td>{index + 1}</td>
                                <td>{discount.code}</td>
                                <td>{discount.name}</td>
                                <td>{discount.is_percentage ? `${discount.discount_value}%` : `$${discount.discount_value}`}</td>
                                <td>${discount.min_order_value}</td>
                                <td>{discount.max_discount_value}</td>
                                <td>{`${new Date(discount.start_date).toLocaleDateString()} - ${new Date(discount.end_date).toLocaleDateString()}`}</td>
                                <td>{discount.usage_limit}</td>
                                <td>{discount.status}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {
                                            setEditingDiscount(discount);
                                            setFormData(discount);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(discount.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Pagination className="d-flex justify-content-center mt-5">
                <Pagination.First
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(0)}
                />
                <Pagination.Prev
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                />
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx}
                        active={idx === currentPage}
                        onClick={() => handlePageChange(idx)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    disabled={currentPage === totalPages - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                />
                <Pagination.Last
                    disabled={currentPage === totalPages - 1}
                    onClick={() => handlePageChange(totalPages - 1)}
                />
            </Pagination>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingDiscount ? 'Edit Discount' : 'Add New Discount'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Discount Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.discount_value}
                                        onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Percentage"
                                        checked={formData.is_percentage}
                                        onChange={(e) => setFormData({ ...formData, is_percentage: e.target.checked })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usage Limit</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.usage_limit}
                                        onChange={(e) => setFormData({ ...formData, usage_limit: Number(e.target.value) })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Min Order Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.min_order_value}
                                        onChange={(e) => setFormData({ ...formData, min_order_value: Number(e.target.value) })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Max Discount Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.max_discount_value}
                                        onChange={(e) => setFormData({ ...formData, max_discount_value: Number(e.target.value) })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Per User Limit</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.per_user_limit}
                                        onChange={(e) => setFormData({ ...formData, per_user_limit: Number(e.target.value) })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DiscountsTable
