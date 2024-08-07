import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../../actions/productActions';
import './AddProduct.css'
import { AddNewProduct, uploadImage } from '../../../../../actions/AdminActions';

function AddProduct(props) {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        thumbnail: '',
        description: '',
        category_id: 1
    })

    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch()

    const { categories } = useSelector(state => state.getProducts)
    // const {addNewPdSuccessfully} = useSelector(state => state.productAdminReducer)

    const addNewProduct = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setValidated(true);
        // console.log(newProduct)
        
        dispatch(AddNewProduct(newProduct)).then((savedProduct) => {
            if(savedProduct !== null)
                dispatch(uploadImage(savedProduct.id, newProduct.images))
            setNewProduct({
                name: '',
                price: 0,
                thumbnail: '',
                description: '',
                category_id: 1,
                images: []
            })
            props.onHide()
        })
    }

    const onChangePrice = (e) => {
        let newPrice = e.target.value
        setNewProduct({ ...newProduct, price: newPrice })
    }

    const onFileChange = (event) => {
        // Array.from(event.target.files).map((file) => (
        //     console.log(file)
        // ))
        setNewProduct({...newProduct, images: Array.from(event.target.files)})
    };

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <div>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} className='form-add-product'>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={3}>
                                Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Enter name"
                                    className='product-name'
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">Name of product is required</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
                            <Form.Label column sm={3}>
                                Price
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Enter price"
                                    className='product-price'
                                    value={newProduct.price}
                                    onChange={(e) => onChangePrice(e)}
                                // isValid={parseFloat(newProduct.price) > 0}
                                />
                                <Form.Control.Feedback type="invalid">Price of product is required and must be greater or equal 0</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                            <Form.Label column sm={3}>
                                Description
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    className='product-description'
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                            <Form.Label column sm={3}>
                                Category
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Select onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>
                                    <option value={0} disabled>Choose category</option>
                                    {categories.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                            <Form.Label column sm={3}>
                                Image
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="file" multiple onChange={onFileChange}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={(e) => addNewProduct(e)}>Add new</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddProduct
