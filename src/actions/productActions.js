import axios from '../customize/axios'

export const getProducts = (keyword, categoryId, page, limit) => async (dispatch) => {
    try {
        await dispatch({type: 'FETCH_PRODUCTS_REQUEST'})
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            params: {page, limit, keyword, category_id: categoryId},
        })

        response.data.products.forEach((product) => {
            product.url = `${process.env.REACT_APP_API_BASE_URL}/products/images/${product.thumbnail}`
        })
        const data = response.data
        dispatch({type: 'FETCH_PRODUCTS_SUCCESS', payload: {...data, categoryId, keyword, page}})
        // dispatch({type: 'SEARCH_PRODUCT', payload: data.totalPage})
    }   
    catch(err) {
        console.log(err)
        dispatch({type: 'FETCH_PRODUCTS_FAILURE', payload: err.message})
    }
}

export const changePage = (page) => async (dispatch) => {
    try {
        await dispatch({type: 'CHANGE_PAGE', payload: page})
    }
    catch (err) {
        console.log(err)
    }
}

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`,{
            params: {
                page: 0, 
                limit: 30
            }
        })
        const data = response.data
        dispatch({type: 'FETCH_CATEGORIES', payload: data})
    }
    catch(err) {
        console.log(err)
    }
}

export const getDetailProduct = (productId) => async (dispatch) => {
    try {

    }
    catch (err) {
        console.log(err)
    }
}