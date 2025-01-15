import axios from '../customize/axios'

export const getCategories = () => async (dispatch) => {    
    try {
        dispatch({type: 'FETCH_CATEGORIES_REQUEST'})
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`)
        const res = response.data
        dispatch({type: 'FETCH_CATEGORIES_SUCCESS', payload: res})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'FETCH_CATEGORIES_FAILURE', payload: err.message})
    }
}

export const addCategory = (category) => async (dispatch) => {  
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories`, category)
        const res = response.data
        dispatch({type: 'ADD_CATEGORY_SUCCESS', payload: res})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'ADD_CATEGORY_FAILURE', payload: err.message})
    }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({type: 'DELETE_CATEGORY_REQUEST'})
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}`)
        dispatch({type: 'DELETE_CATEGORY_SUCCESS', payload: categoryId})
    }   
    catch (err) {
        console.log(err)
        dispatch({type: 'DELETE_CATEGORY_FAILURE', payload: err.message})
    }
}