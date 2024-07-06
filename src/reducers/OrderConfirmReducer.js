const initialState = {
    orderResponse: {
        id: 0,
        user_id: 0,
        fullname: '',
        phone_number: 0,
        email: '',
        address: '',
        note: '',
        order_date: new Date(),
        status: '',
        total_money: 0,
        shipping_method: '',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: '',
        order_details: []
    },
    error: ''
}

const OrderConfirmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ORDER_DETAIL_SUCCESS':
            return {
                ...state,
                orderResponse: {
                    ...state.orderResponse,
                    ...action.payload
                }
            }
        case 'FETCH_ORDER_DETAIL_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default OrderConfirmReducer