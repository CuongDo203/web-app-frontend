import { toast } from 'react-toastify'
import axios from '../customize/axios'

//  Orders

export const getAllOrder = (keyword = "", page, limit) => async (dispatch) => {
    try {
        await dispatch({ type: 'GET_ORDERS' })
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/get-orders-by-keyword`, {
            params: { page, limit, keyword },
        })
        const data = response.data
        dispatch({
            type: 'GET_ORDERS_SUCCESSFULLY', payload: {
                orders: data.orders,
                totalPages: data.totalPages,
                page,
                keyword
            }
        })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'GET_ORDERS_FAILED', payload: err.message })
    }
}

export const getOrderById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`);
        const data = response.data
        dispatch({ type: 'GET_ORDER_BY_ID_SUCCESSFULLY', payload: data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'GET_ORDER_BY_ID_FAILED', payload: err.message })
    }
}

export const updateOrderStatus = (orderDTO) => async (dispatch) => {
    try {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderDTO.id}`, orderDTO)
        dispatch({ type: 'UPDATE_ORDER_SUCCESSFULLY', payload: orderDTO.status })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'UPDATE_ORDER_FAILED' })
    }
}

export const deleteOrderById = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`, {
            responseType: "text"
        })
        toast.success(`Delete order with ID = ${id} successfully`)
        dispatch({ type: 'DELETE_ORDER_SUCCESSFULLY' })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'DELETE_ORDER_FAILED' })
        toast.error(`Delete order with ID = ${id} failed`)
    }
}

export const resetUpdateStatus = () => (dispatch) => {
    dispatch({ type: 'UPDATE_ORDER_FAILED' })
}

export const resetDeleteStatus = () => (dispatch) => {
    dispatch({ type: 'DELETE_ORDER_FAILED' })
}

//Products 

export const getAllProducts = (keyword, categoryId, page, limit) => async (dispatch) => {
    try {
        await dispatch({ type: 'GET_PRODUCTS' })
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            params: { page, limit, keyword, category_id: categoryId },
        })

        response.data.products.forEach((product) => {
            product.url = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product.thumbnail}`
        })
        const data = response.data
        dispatch({ type: 'GET_PRODUCTS_SUCCESSFULLY', payload: { ...data, categoryId, keyword, page } })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: err.message })
    }
}

export const changePage = (page, type_change) => async (dispatch) => {
    try {
        await dispatch({ type: type_change, payload: page })
    }
    catch (err) {
        console.log(err)
    }
}

export const AddNewProduct = (newProduct) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            name: newProduct.name,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            description: newProduct.description,
            category_id: newProduct.category_id
        })
        const data = response.data
        dispatch({ type: 'ADD_NEW_PD_SUCCESSFULLY' })
        toast.success('Add new products successfully!')
        return data
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'ADD_NEW_PD_FAILED' })
        toast.error('Add new product failed!')
        return null
    }
}

export const uploadImage = (productId, images) => async (dispatch) => {
    try {
        if(images.length === 0) {
            return
        }
        const formData = new FormData();
        images.forEach((image) => formData.append('files', image))
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/uploads/${productId}`, formData);
        toast.success('Add new images successfully!')
    }
    catch (err) {
        console.log(err)
        toast.error('Can not add more images! The number of images cannot exceed 5!')
    }
}

export const getProductById = (productId) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        let data = response.data
        if (data.product_images && data.product_images.length > 0) {
            data.product_images.forEach((product_image) => {
                product_image.image_url = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product_image.image_url}`
            })
        }
        return data
    }
    catch (err) {
        console.log(err)
        return null
    }
}

export const deleteProductById = (productId) => async () => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        toast.success(`Delete product with ID = ${productId} successfully!`)
    }
    catch(err) {
        console.log(err)
        toast.error(`Delete product with ID = ${productId} failed!`)
    }
}