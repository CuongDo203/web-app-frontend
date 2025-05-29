import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Carousel, Image } from 'react-bootstrap'
import './AdminProductDetail.css'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById, uploadImage } from '../../../../../actions/AdminActions';
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";

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

  const handleDeleteImage = (index) => {
    // Implement the delete image functionality here
  }

  return (
    <Container className="admin-product-detail">
      <h2 className="section-title">Product Details</h2>
      
      <Row>
        <Col md={6}>
          <div className="form-section">
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={product?.name || ''}
                disabled
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={product?.description || ''}
                disabled
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={product?.price || ''}
                disabled
              />
            </Form.Group>
          </div>
        </Col>
        
        <Col md={6}>
          <div className="image-carousel">
            <Carousel>
              {product?.product_images?.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    className="carousel-image"
                    src={image.image_url}
                    alt={`Product image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="image-counter">
              Current Images: <span>{product?.product_images?.length || 0}/5</span>
            </div>
          </div>
          
          <div 
            className="image-upload-section"
            onClick={() => document.getElementById('imageUpload').click()}
          >
            <TbSquareRoundedPlusFilled className="upload-icon" />
            <p>Click to add new images</p>
            <input
              id="imageUpload"
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>

          <div className="image-list">
            {product?.images?.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image} alt={`Product ${index + 1}`} />
                <FaTrash 
                  className="delete-icon"
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminProductDetail
