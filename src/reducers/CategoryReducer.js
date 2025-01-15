const initialState = {
    categories: [],
    loading: false,
    error: null
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case 'FETCH_CATEGORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ADD_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload]
            }
        case 'ADD_CATEGORY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'DELETE_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'DELETE_CATEGORY_SUCCESS':
            return {
                ...state,
                categories: state.categories.filter((category) => category.id !== action.payload),
                loading: false
            }
        case 'DELETE_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default categoryReducer;