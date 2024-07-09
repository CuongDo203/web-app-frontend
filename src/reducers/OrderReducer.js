
const initialState = {
    cartItems: [],
    couponCode: '',
    totalAmount: 0,
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
                error: action.payload
            }    
        case 'PLACE_ORDER':
            return {
                ...state,
                orderData: {
                    ...state.orderData,
                    ...(action.payload)
                }
            }
        default:
            return state
    }
}

export default OrderReducer