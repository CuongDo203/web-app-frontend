import { toast } from 'react-toastify';
import axios from '../customize/axios'

export const getProductsInCart = (cart) => async (dispatch) => {
    try {
        const productIds = Array.from(cart.keys())
        if (productIds.length === 0) {
            dispatch({ type: 'FETCH_PRODUCTS_BY_IDS_FAILURE', payload: "Không có sản phẩm nào trong giỏ hàng!" })
            return;
        }
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/by-ids`, {
            params: { ids: productIds.join(',') }
        })
        const data = response.data
        const dataResponse = productIds.map(productId => {
            const product = data.find((p) => p.id === productId)
            if (product) {
                product.thumbnail = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product.thumbnail}`
            }
            return {
                product,
                quantity: cart.get(productId)
            }
        })
        dispatch({ type: 'FETCH_PRODUCTS_BY_IDS_SUCCESS', payload: dataResponse })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'FETCH_PRODUCTS_BY_IDS_FAILURE', payload: err.message })
    }
}

export const placeOrder = (formData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, formData)
        let data = response.data
        // console.log('data.id = ', data.id)
        dispatch({ type: 'PLACE_ORDER_SUCCESSFULLY', payload: data.id })
        toast.success('Đặt hàng thành công!')
        return data
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'PLACE_ORDER_FAILED' })
        toast.error('Đặt hàng thất bại!')
        return null
    }
}

export const getOrdersOfUser = (userId, page, limit) => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_ORDERS_REQUEST' });
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/user/${userId}`, {
            params: { page, limit }
        })
        const data = response.data
        console.log('data = ', data)
        dispatch({
            type: 'FETCH_ORDERS_SUCCESSFULLY',
            payload: {
                orders: response.data.orders,
                totalPages: response.data.totalPages
            }
        });
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'FETCH_ORDERS_FAILED', payload: err.message })
    }
}