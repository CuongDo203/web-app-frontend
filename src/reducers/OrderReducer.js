
const initialState = {
    cartItems: [],
    couponCode: '',
    totalAmount: 0,
    idOrderPlaced: null,
    orderData: {
        id: 0,
        user_id: 0,
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        note: '',
        total_money: 0,
        payment_method: 'cod',   //Mặc định là thanh toán khi nhận hàng COD
        shipping_method: 'express',  //Mặc định là giao hàng nhanh
        coupon_code: '',
        cart_items: []
    },
    orders: [],
    error: ""
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_BY_IDS_SUCCESS':
            return {
                ...state,
                cartItems: action.payload
            }
        case 'FETCH_PRODUCTS_BY_IDS_FAILURE':
            return {
                ...state,
                cartItems: [],
                error: action.payload
            }    
        case 'PLACE_ORDER_SUCCESSFULLY':
            console.log('place order payload: ', action.payload)
            return {
                ...state,
                idOrderPlaced: action.payload
            }
        case 'PLACE_ORDER_FAILED':
            return {
                ...state,
                idOrderPlaced: null
            }
        case 'FETCH_ORDERS_SUCCESSFULLY':   
            return {
                ...state,
                orders: action.payload
            }
        case 'FETCH_ORDERS_FAILED':
            return {
                ...state,
                orders: []
            } 
        default:
            return state
    }
}

export default OrderReducer