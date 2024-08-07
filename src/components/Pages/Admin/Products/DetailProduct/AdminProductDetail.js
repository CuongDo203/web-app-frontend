import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Carousel, Image } from 'react-bootstrap'
import './AdminProductDetail.css'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById, uploadImage } from '../../../../../actions/AdminActions';
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { toast } from 'react-toastify';

function AdminProductDetail() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null)
  const [newImages, setNewImages] = useState([])
  const [isAddImgSuccess, setIsAddImgSuccess] = useState(false)

  const handleFileChange = (e) => {
    setNewImages(Array.from(e.target.files));
  }

  useEffect(() => {
    if(newImages.length > 0) {
      handleAddMoreImage()
    }
    // return () => setIsAddImgSuccess(false)
  }, [newImages, isAddImgSuccess])

  const handleAddMoreImage = () => {
    
    if (newImages.length === 0) {
      toast.error('Please select images to upload!');
      return;
    }
    dispatch(uploadImage(id, newImages)).then((imageResponses) => {
      setIsAddImgSuccess(true)
      setNewImages([])
    })
    .catch(() => {
      setIsAddImgSuccess(false)
    })
  }

  useEffect(() => {
    dispatch(getProductById(id)).then((responseData) => {
      setProduct(responseData)
    }).catch(() => {
      setProduct(null)
    })
  }, [id, dispatch, isAddImgSuccess])

  return (
    <Container id='admin-product-detail'>
      <Form>
        <h2>Detailed information about products with ID = {id}</h2>
        <Form.Group as={Row} className="mb-3">
          <Form.Label className='detail-product-label' column sm={3}>
            ID:
          </Form.Label>
          <Col sm={9}>
            <Form.Label>{product !== null ? product.id : '...'}</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className='detail-product-label'>
            Name:
          </Form.Label>
          <Col sm={9}>
            <Form.Label>{product !== null ? product.name : '...'}</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className='detail-product-label'>
            Price:
          </Form.Label>
          <Col sm={9}>
            <Form.Label>{product !== null ? product.price : '...'}</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className='detail-product-label'>
            Description:
          </Form.Label>
          <Col sm={9}>
            <Form.Label>{product !== null ? product.description : '...'}</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className='detail-product-label'>
            Images:
          </Form.Label>
          <Col sm={9}>
            <Row>
              <Col><p>{product != null ? product.product_images.length : '-'} / maximum (5)</p></Col>
              <Col>
                <Form.Label htmlFor='image-upload'>
                  <TbSquareRoundedPlusFilled id='add-image-icon' />
                </Form.Label>
                <Form.Control type='file' multiple id='image-upload' onChange={(e) => handleFileChange(e)} />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
        <Carousel >
              {product !== null ? product.product_images.map((item, idx) => (
                <Carousel.Item interval={2000} key={idx}>
                <Image src={item.image_url} />
              </Carousel.Item>
              )) : ''}
            </Carousel>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default AdminProductDetail
