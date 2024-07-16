import axios from '../customize/axios'

export const getAllOrder = (keyword = "", page, limit) => async (dispatch) => {
    try{
        await dispatch({type: 'GET_ORDERS'})
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/get-orders-by-keyword`,{
            params: {page, limit, keyword},
        })
        const data = response.data
        console.log(data)
        dispatch({type: 'GET_ORDERS_SUCCESSFULLY', payload: {
            orders: data.orders,
            totalPages: data.totalPages,
            page, 
            keyword
        }})
    }
    catch(err) {
        console.log(err)
        dispatch({type: 'GET_ORDERS_FAILED', payload: err.message})
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