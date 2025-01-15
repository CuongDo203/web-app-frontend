import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById, resetUpdateStatus, updateOrderStatus } from '../../../../actions/AdminActions';
import { toast } from 'react-toastify';
import './OrderDetail.css';

function OrderDetail() {

  const { id } = useParams();
  const { order } = useSelector(state => state.orderAdminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getOrderById(id))
  }, [id, dispatch])
  
  const [orderStatus, setOrderStatus] = useState(order.status);

  const handleUpdateOrderStatus = () => {
    dispatch(updateOrderStatus({...order, status: orderStatus}))
    .then(() => {
      dispatch(resetUpdateStatus())
      navigate('/admin/order')
      toast.success('Update order successfully!')
    })
    .catch(err => {
      toast.error('Update order failed!')
      console.log(err)
    })
  }
  
  return (
    <div className="order-detail-container">
        <div className="order-info">
            <p>
                <strong>Full Name</strong>
                {order.fullname}
            </p>
            <p>
                <strong>Phone Number</strong>
                {order.phone_number}
            </p>
            <p>
                <strong>Email</strong>
                {order.email}
            </p>
            <p>
                <strong>Address</strong>
                {order.address}
            </p>
            <p>
                <strong>Note</strong>
                {order.note}
            </p>
            <p>
                <strong>Order Date</strong>
                {new Date(order.order_date).toLocaleDateString('vi-VN')}
            </p>
            <div className='order-status'>
                <label htmlFor="statusSelect">Status</label>
                <select 
                    id='statusSelect' 
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
        </div>
        
        <div className="order-items">
            <h3>Order Items</h3>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.order_details?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.name}</td>
                            <td>${item.price}</td>
                            <td>{item.numberOfProducts}</td>
                            <td>${item.price * item.numberOfProducts}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <Button variant='primary' className='col-md-2' onClick={() => handleUpdateOrderStatus()}>Save</Button>
    </div>
  )
}

export default OrderDetail
