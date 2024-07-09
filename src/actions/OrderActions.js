import axios from '../customize/axios'

export const getProductsInCart = (cart) => async (dispatch) => {
    try {
        let productIds = Array.from(cart.keys())
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/by-ids`, {
            params: {ids: productIds.join(',')}
        })
        const data = response.data
        const dataResponse = productIds.map(productId => {
            const product = data.find((p) => p.id === productId)
            if(product) {
                product.thumbnail = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product.thumbnail}`
            }
            return {
                product,
                quantity: cart.get(productId)
            }
        })
        console.log(dataResponse)
        dispatch({type: 'FETCH_PRODUCTS_BY_IDS_SUCCESS', payload: dataResponse})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'FETCH_PRODUCTS_BY_IDS_FAILURE', payload: err.message})
    }
}

export const placeOrder = (formData) => async (dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, formData)
        // response = response.data
        alert('Đặt hàng thành công!')
    }
    catch (err) {
        console.log(err)
    }
}