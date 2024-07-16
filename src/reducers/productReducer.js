
const initialState = {
    products: [],
    categories: [],
    totalPages: 0,
    currentPage: 0,
    limitPerPages: 30,
    pages: [],
    keyword: '',
    categoryId: 0,
    visiblePages: [],
    loading: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalPages: action.payload.totalPage,
                currentPage: action.payload.page,
                visiblePages: generateVisiblePageArray(state.currentPage, action.payload.totalPage),
                keyword: action.payload.keyword,
                categoryId: action.payload.categoryId
            }
        case 'FETCH_PRODUCTS_FAILURE':
            return {
                ...state,
                loading: false,
                products: [],
                totalPage: 0,
                visiblePages: [],
                error: action.payload
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.payload,
                visiblePages: generateVisiblePageArray(action.payload, state.totalPages)
            }
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

export function generateVisiblePageArray(currentPage, totalPages) {
    const maxVisiblePages = 5
    const halfVisiblePages = Math.floor(maxVisiblePages/2)

    let startPage = Math.max(currentPage - halfVisiblePages, 1)
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    if(endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }
    let arr = new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index - 1)
    return arr
}

export default productReducer