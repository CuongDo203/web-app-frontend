import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { Table, Pagination, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, changePage } from '../../../actions/AdminActions';

function OrderTable() {

    const { isLoading, currentPage, limitPerPages, keyword, visiblePages, orders, totalPages } = useSelector(state => state.orderAdminReducer);
    const dispatch = useDispatch()

    const onPageChange = (page) => {
        dispatch(changePage(page))
    }

    useEffect(() => {
        dispatch(getAllOrder(keyword, currentPage, limitPerPages))
    }, [currentPage, limitPerPages, keyword, dispatch])

    return (
        <div>
            <h4>Orders </h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Shipping Method</th>
                        <th>Payment Method</th>
                        <th>Total Money</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <Spinner animation="border" variant="info" />
                    ) : (
                        <>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{order.id}</td>
                                    <td>{order.fullname}</td>
                                    <td>{order.phone_number}</td>
                                    <td>{order.address}</td>
                                    <td>{order.note}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.status}</td>
                                    <td>{order.shipping_method}</td>
                                    <td>{order.payment_method}</td>
                                    <td>{order.total_money}</td>
                                    <td>
                                        <a href='#'><MdDelete /></a>
                                    </td>
                                </tr>
                            ))}
                         </>   
                    )}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First disabled={currentPage === 0} onClick={() => onPageChange(0)}/>
                <Pagination.Prev disabled={currentPage === 0} onClick={() => onPageChange(currentPage-1)}/>
                {visiblePages.map((page, idx) => (
                    <Pagination.Item key={idx} active={page === currentPage} onClick={() => onPageChange(page)}>{page + 1}</Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPages-1} onClick={() => onPageChange(currentPage + 1)}/>
                <Pagination.Last disabled={currentPage === totalPages-1} onClick={() => onPageChange(totalPages-1)}/>
            </Pagination>
        </div>
    )
}

export default OrderTable
