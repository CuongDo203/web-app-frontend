const initialState = {
    discountData: {
        id: null,
        code: '',
        name: '',
        discount_value: 0,
        is_percentage: false,
        min_order_value: 0,
        max_discount_value: null,
        start_date: '',
        end_date: '',
        usage_limit: 0,
        per_user_limit: null
    },
    discounts: [],
    loading: false,
    totalPages: 0,
    currentPage: 0
}

const DiscountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DISCOUNTS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_DISCOUNTS_SUCCESS':
            return {
                ...state,
                discounts: action.payload.discountResponses,
                totalPages: action.payload.totalPages,
                loading: false
            }
        case 'FETCH_DISCOUNTS_FAILURE':
            return {
                ...state,
                discounts: [],
                loading: false
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'ADD_DISCOUNT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_DISCOUNT_SUCCESS':
            return {
                ...state,
                discountData: action.payload,
                loading: false
            }
        case 'ADD_DISCOUNT_FAILURE':
            return {
                ...state,
                loading: false,
                discountData: {
                    code: '',
                    name: '',
                    discount_value: 0,
                    is_percentage: false,
                    min_order_value: 0,
                    max_discount_value: null,
                    start_date: '',
                    end_date: '',
                    usage_limit: 0,
                    per_user_limit: null
                }
            }
        case 'UPDATE_DISCOUNT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'UPDATE_DISCOUNT_SUCCESS':
            return {
                ...state,
                discountData: action.payload,
                loading: false
            }
        case 'UPDATE_DISCOUNT_FAILURE':
            return {
                ...state,
                loading: false
            }
        case 'DELETE_DISCOUNT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'DELETE_DISCOUNT_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'DELETE_DISCOUNT_FAILURE':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_ACTIVE_DISCOUNTS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_ACTIVE_DISCOUNTS_SUCCESS':
            return {
                ...state,
                discounts: action.payload.discountResponses,
                loading: false
            }
        case 'FETCH_ACTIVE_DISCOUNTS_FAILURE':
            return {
                ...state,
                discounts: [],
                loading: false
            }
        case 'APPPLY_DISCOUNT_TO_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'APPPLY_DISCOUNT_TO_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'APPPLY_DISCOUNT_TO_CATEGORY_FAILURE':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_DISCOUNTS_BY_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_DISCOUNTS_BY_CATEGORY_SUCCESS':
            return {
                ...state,
                discounts: action.payload,
                loading: false
            }
        case 'FETCH_DISCOUNTS_BY_CATEGORY_FAILURE':
            return {
                ...state,
                discounts: [],
                loading: false
            }
        case 'FETCH_DISCOUNTS_BY_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_DISCOUNTS_BY_PRODUCT_SUCCESS':
            return {
                ...state,
                discounts: action.payload,
                loading: false
            }
        case 'FETCH_DISCOUNTS_BY_PRODUCT_FAILURE':
            return {
                ...state,
                discounts: [],
                loading: false
            }
        case 'APPLY_DISCOUNT_TO_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'APPLY_DISCOUNT_TO_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'APPLY_DISCOUNT_TO_PRODUCT_FAILURE':
            return {
                ...state,
                loading: false
            }
        case 'CHECK_VALID_DISCOUNT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'CHECK_VALID_DISCOUNT_SUCCESS':
            return {
                ...state,
                discountData: action.payload,
                loading: false
            }
        case 'CHECK_VALID_DISCOUNT_FAILURE':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default DiscountReducer