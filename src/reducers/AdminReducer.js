import { generateVisiblePageArray } from "./productReducer"

const orderState = {
    totalPages: 0,
    currentPage: 0,
    limitPerPages: 5,
    keyword: '',
    visiblePages: [],
    isLoading: false,
    orders: []
}

export const OrderAdminReducer = (state = orderState, action) => {
    switch (action.type) {
        case 'GET_ORDERS':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_ORDERS_SUCCESSFULLY':
            return {
                ...state,
                orders: action.payload.orders,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.page,
                visiblePages: generateVisiblePageArray(state.currentPage, action.payload.totalPages),
                keyword: action.payload.keyword,
                isLoading: false
            }
        case 'GET_ORDERS_FAILED':
            return {
                ...state,
                orders: [],
                totalPages: 0,
                visiblePages: [],
                isLoading: false,
                error: action.payload
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.payload,
                visiblePages: generateVisiblePageArray(action.payload, state.totalPages)
            }
        default:
            return state
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