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
    isDeleted: false,
    isUpdateStatusSuccessfully: false
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
        case 'CHANGE_ORDER_PAGE':
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
        case 'DELETE_ORDER_SUCCESSFULLY':
            return {
                ...state,
                isDeleted: true
            }
        case 'DELETE_ORDER_FAILED':
            return {
                ...state,
                isDeleted: false
            }
        case 'UPDATE_ORDER_SUCCESSFULLY':
            return {
                ...state,
                order: {
                    ...state.order,
                    status: action.payload
                },
                isUpdateStatusSuccessfully: true
            }
        case 'UPDATE_ORDER_FAILED':
            return {
                ...state,
                isUpdateStatusSuccessfully: false
            }
        default:
            return state
    }
}

const productState = {
    totalProductPages: 0,
    currentProductPage: 0,
    limitProductPerPages: 15,
    keyword: '',
    visibleProductPages: [],
    isLoading: false,
    products: [],
    errors: '',
    addNewPdSuccessfully: false
}

export const ProductAdminReducer = (state = productState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PRODUCTS_SUCCESSFULLY':
            return {
                ...state,
                products: action.payload.products,
                totalProductPages: action.payload.totalPage,
                currentProductPage: action.payload.page,
                visibleProductPages: generateVisiblePageArray(state.currentProductPage, action.payload.totalPage),
                keyword: action.payload.keyword,
                isLoading: false
            }
        case 'GET_PRODUCTS_FAILED': 
            return {
                ...state,
                products: [],
                totalProductPages: 0,
                visibleProductPages: [],
                isLoading: false,
                keyword: '',
                currentProductPage: 0,
                error: action.payload
            }
        case 'ADD_NEW_PD_SUCCESSFULLY':
            return {
                ...state,
                addNewPdSuccessfully: true
            }
        case 'ADD_NEW_PD_FAILED':
            return {
                ...state,
                addNewPdSuccessfully: false
            }
        case 'SET_SEARCH_KEYWORD':
            return {
                ...state,
                keyword: action.payload,
            };
        case 'CHANGE_PRODUCT_PAGE':
            return {
                ...state,
                currentProductPage: action.payload,
                visibleProductPages: generateVisiblePageArray(action.payload, state.totalProductPages)
            }
        default:
            return state;
    }
}
