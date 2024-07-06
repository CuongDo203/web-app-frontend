import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer';
import registerReducer from '../reducers/registerReducer'
import productReducer from '../reducers/productReducer';
import detailProductReducer from '../reducers/detailProductReducer';
import OrderReducer from '../reducers/OrderReducer';
import OrderConfirmReducer from '../reducers/OrderConfirmReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        getProducts: productReducer,
        getDetailProduct: detailProductReducer,
        getProductsInCart: OrderReducer,
        getOrderDetail: OrderConfirmReducer
    }
});

export default store;
