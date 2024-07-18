import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../actions/AdminActions';

function OrderDetail() {

  const { id } = useParams();
  const { order } = useSelector(state => state.orderAdminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [id, dispatch])

  return (
    <div className='container order-admin-detail'>
      <div className='row'>
        <div className='col-md-6'>
          <h3>Order information</h3>
          <p><strong>Order ID: {order.id}</strong></p>
          <p><strong>User ID: {order.user_id}</strong></p>
          <p><strong>Full Name: {order.fullname}</strong></p>
          <p><strong>Phone Number: {order.phone_number}</strong></p>
          <p><strong>Email: {order.email}</strong></p>
          <p><strong>Address: {order.address}</strong></p>
          <p><strong>Note: {order.note}</strong></p>
          <p><strong>Order Date: {order.order_date}</strong></p>
          <div className='form-group order-status'>
            <label htmlFor="statusSelect"><strong>Status: </strong></label>
            <select className='form-control' id='statusSelect' value={order.status}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <h3>Order Detail</h3>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.order_details.map((item, idx) => (
              <tr key={idx}>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.numberOfProducts}</td>
              </tr>
            ))}
            {/* <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
          </tbody>
        </Table>
        <Button variant='primary' className='col-md-2'>Save</Button>
      </div>
    </div>
  )
}

export default OrderDetail
