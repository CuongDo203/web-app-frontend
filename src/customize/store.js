import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer';
import registerReducer from '../reducers/registerReducer'
import productReducer from '../reducers/productReducer';
import detailProductReducer from '../reducers/detailProductReducer';
import OrderReducer from '../reducers/OrderReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        getProducts: productReducer,
        getDetailProduct: detailProductReducer,
        getProductsInCart: OrderReducer
    }
});

export default store;
