const initialState = {
    productImages: [],
    id: null,
    name: "",
    price: 0,
    thumbnail: "",
    description: "",
    categoryId: 0,
    currentImageIndex: 0,
    error: ""
}

const detailProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DETAIL_PRODUCT_SUCCESS':
            return {
                ...state,
                productImages: action.payload.product_images,
                name: action.payload.name,
                price: action.payload.price,
                thumbnail: action.payload.thumbnail,
                categoryId: action.payload.category_id,
                description: action.payload.description,
                id: action.payload.id
            }
        case 'FETCH_DETAIL_PRODUCT_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        case 'THUMBNAIL_CLICK':
            return {
                ...state,
                currentImageIndex: action.payload
            }
        default:
            return state
    }
}

function showImage(index) {
    if(initialState.productImages && initialState.productImages.length > 0) {
        if(index < 0) {
            index = 0
        }
        else if(index >= initialState.productImages.length) {
            index = initialState.productImages.length - 1
        }
        return index
    }
}

export default detailProductReducer