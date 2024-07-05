import axios from '../customize/axios'

export const getDetailProduct = (productId) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        const res = response.data
        if(res.product_images && res.product_images.length > 0) {
            res.product_images.forEach((product_image) => {
                product_image.image_url = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product_image.image_url}`
            })
        }
        
        dispatch({type: 'FETCH_DETAIL_PRODUCT_SUCCESS', payload: res})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'FETCH_DETAIL_PRODUCT_FAILURE', payload: err.message})
    }
}

export const thumbnailClick = (index) => async(dispatch) => {
    try {
        dispatch({type: 'THUMBNAIL_CLICK', payload: index})
    }
    catch (err) {
        console.log(err)
    }
}