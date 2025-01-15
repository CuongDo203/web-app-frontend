import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../actions/productActions';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import './Categories.css'
import { addCategory, deleteCategory } from '../../../../actions/CategoryAction';

function CategoryTable() {
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast.error('Category name is required!');
      return;
    }
    
    dispatch(addCategory({ name: newCategory }))
      .then(() => {
        toast.success('Category added successfully!');
        setNewCategory('');
        handleClose();
        // Refresh category list
        dispatch(getCategories()).then(setData);
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to add category');
      });
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    
    dispatch(deleteCategory(categoryToDelete.id))
      .then(() => {
        toast.success('Category deleted successfully!');
        setShowDeleteModal(false);
        // Refresh list
        dispatch(getCategories()).then(setData);
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to delete category');
      });
  };

  useEffect(() => {
    dispatch(getCategories()).then((dataResponse) => {
      console.log(dataResponse)
      setData(dataResponse)
    })
  }, [dispatch])

  return (
    <div className='category-container'>
      <h4 className='text-center category-title'>Category Management</h4>
      <div className='action-bar'>
        <Button className='add-btn' onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>
          Add New Category
        </Button>
      </div>

      {/* Add Category Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='table-responsive'>
        <Table hover className='category-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <div>
                    <MdDelete 
                    // className="delete-icon" 
                    onClick={() => handleDeleteClick(item)}
                    style={{ 
                      cursor: 'pointer', 
                      color: '#dc3545',
                      fontSize: '1.2rem' 
                    }}
                  />
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default CategoryTable
