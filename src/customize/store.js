import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer';
import registerReducer from '../reducers/registerReducer'
import productReducer from '../reducers/productReducer';
import detailProductReducer from '../reducers/detailProductReducer';
import OrderReducer from '../reducers/OrderReducer';
import OrderConfirmReducer from '../reducers/OrderConfirmReducer';
import updateUserReducer from '../reducers/UpdateUserReducer';
import { OrderAdminReducer, ProductAdminReducer } from '../reducers/AdminReducer';
import sendEmailReducer from '../reducers/SendEmailReducer';
import changePasswordReducer from '../reducers/ChangePasswordReducer';
import CategoryReducer from '../reducers/CategoryReducer';
import DiscountReducer from '../reducers/DiscountReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        getProducts: productReducer,
        getDetailProduct: detailProductReducer,
        getProductsInCart: OrderReducer,
        getOrderDetail: OrderConfirmReducer,
        updateUser: updateUserReducer,
        orderAdminReducer: OrderAdminReducer,
        productAdminReducer: ProductAdminReducer,
        emailReducer: sendEmailReducer,
        changePwReducer: changePasswordReducer,
        getOrdersOfUserReducer: OrderReducer,
        addCategoryReducer: CategoryReducer,
        getCategoryReducer: CategoryReducer,
        getDiscountsReducer: DiscountReducer
    }
});

export default store;
