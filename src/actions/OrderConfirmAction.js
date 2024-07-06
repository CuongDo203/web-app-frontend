import axios from '../customize/axios'

export const getOrderById = (orderId) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`)
        const data = response.data
        console.log(data)
        const orderResponse = {
            ...data,
            order_details: data.order_details.map(orderDetail => {
                orderDetail.product.thumbnail = `${process.env.REACT_APP_API_BASE_URL}/products/images/${orderDetail.product.thumbnail}`
                return orderDetail
            })
        }
        dispatch({type: 'FETCH_ORDER_DETAIL_SUCCESS', payload: orderResponse})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'FETCH_ORDER_DETAIL_FAILURE', payload: err.message})
    }
} 