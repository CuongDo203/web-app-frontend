import { generateVisiblePageArray } from "./productReducer"

const orderState = {
    totalOrderPages: 0,
    currentOrderPage: 0,
    limitOrderPerPages: 5,
    keyword: '',
    visiblePages: [],
    isLoading: false,
    orders: [],
    order: {
        id: null,
        user_id: null,
        status: '',
        fullname: '',
        phone_number: '',
        email: '',
        address: '',
        note: '',
        order_date: null,
        total_money: 0,
        order_details: []
    },
    isDeleted: false
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
                totalOrderPages: action.payload.totalPages,
                currentOrderPage: action.payload.page,
                visiblePages: generateVisiblePageArray(state.currentOrderPage, action.payload.totalPages),
                keyword: action.payload.keyword,
                isLoading: false
            }
        case 'GET_ORDERS_FAILED':
            return {
                ...state,
                orders: [],
                totalOrderPages: 0,
                visiblePages: [],
                isLoading: false,
                error: action.payload
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentOrderPage: action.payload,
                visiblePages: generateVisiblePageArray(action.payload, state.totalOrderPages)
            }
        case 'GET_ORDER_BY_ID_SUCCESSFULLY':
            return {
                ...state,
                order: {
                    ...state.order,
                    ...(action.payload)
                }
            }
        case 'GET_ORDER_BY_ID_FAILED':
            return {
                ...state,
                error: action.payload
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