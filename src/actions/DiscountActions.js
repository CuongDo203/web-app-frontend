import { type } from '@testing-library/user-event/dist/type';
import axios from '../customize/axios'

export const getDiscounts = (page, limit, sortBy, sortDirection, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_DISCOUNTS_REQUEST' });

        const params = {};
        
        if (page !== null && page !== undefined) params.page = page;
        if (limit !== null && limit !== undefined) params.limit = limit;
        if (sortBy !== null && sortBy !== undefined) params.sortBy = sortBy;
        if (sortDirection !== null && sortDirection !== undefined) params.sortDirection = sortDirection;
        if (startDate !== null && startDate !== undefined && startDate !== '') params.startDate = startDate;
        if (endDate !== null && endDate !== undefined && endDate !== '') params.endDate = endDate;

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/discounts`, { params });
        const data = response.data;
        console.log('data  ', data);
        dispatch({ type: 'FETCH_DISCOUNTS_SUCCESS', payload: data });
        
        return { success: true, data };
    } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_DISCOUNTS_FAILURE' });
        return { success: false, error: err.message };
    }
};

export const getActiveDiscounts = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_ACTIVE_DISCOUNTS_REQUEST' });
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/discounts/active`);
        const data = response.data;
        dispatch({ type: 'FETCH_ACTIVE_DISCOUNTS_SUCCESS', payload: data });
        return { success: true, data };
    } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_ACTIVE_DISCOUNTS_FAILURE' });
        return { success: false, error: err.message };
    }
}

export const addDiscount = (discountData) => async (dispatch) => {  
    try {
        dispatch({ type: 'ADD_DISCOUNT_REQUEST' })
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/discounts`, discountData)
        const data = response.data
        dispatch({ type: 'ADD_DISCOUNT_SUCCESS', payload: data })
        return { success: true };
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'ADD_DISCOUNT_FAILURE' })
        return { success: false, error: err.message };
    }
}

export const updateDiscount = (id, discountData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_DISCOUNT_REQUEST' })
        const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/discounts/${id}`, discountData)
        const data = response.data
        dispatch({ type: 'UPDATE_DISCOUNT_SUCCESS', payload: data })
        return { success: true };
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'UPDATE_DISCOUNT_FAILURE' })
        return { success: false, error: err.message };
    }
}

export const deleteDiscount = (id) => async (dispatch) => { 
    try {
        dispatch({ type: 'DELETE_DISCOUNT_REQUEST' })
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/discounts/${id}`)
        dispatch({ type: 'DELETE_DISCOUNT_SUCCESS', payload: id })
        return { success: true };
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'DELETE_DISCOUNT_FAILURE' })
        return { success: false, error: err.message };
    }
}

export const applyDiscountToCategory = (discountId, categoryId) => async (dispatch) => {
    try {
        dispatch({ type: 'APPPLY_DISCOUNT_TO_CATEGORY_REQUEST' });
        
        // Convert parameters to numbers
        const parsedDiscountId = Number(discountId);
        const parsedCategoryId = Number(categoryId);
        
        if (isNaN(parsedDiscountId) || isNaN(parsedCategoryId)) {
            throw new Error('Invalid discount or category ID');
        }

        await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/discount_categoty?discount_id=${parsedDiscountId}&category_id=${parsedCategoryId}`
        );
        
        dispatch({ type: 'APPPLY_DISCOUNT_TO_CATEGORY_SUCCESS' });
        return { success: true };
    }
    catch (err) {
        dispatch({ type: 'APPPLY_DISCOUNT_TO_CATEGORY_FAILURE' });
        return { success: false, error: err.message };
    }
}

export const applyDiscountToProduct = (discountId, productId) => async (dispatch) => {
    try {
        dispatch({ type: 'APPPLY_DISCOUNT_TO_PRODUCT_REQUEST' })
        const parsedDiscountId = Number(discountId);
        const parsedProductId = Number(productId);
        
        if (isNaN(parsedDiscountId) || isNaN(parsedProductId)) {
            throw new Error('Invalid discount or product ID');
        }
        console.log('parsedDiscountId', parsedDiscountId)
        console.log('parsedProductId', parsedProductId)
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/discount_product?discount_id=${parsedDiscountId}&product_id=${parsedProductId}`)
        dispatch({ type: 'APPPLY_DISCOUNT_TO_PRODUCT_SUCCESS' })
        return { success: true };
    }
    catch (err) {
        console.log(err)
        dispatch({ type: 'APPPLY_DISCOUNT_TO_PRODUCT_FAILURE' })
        return { success: false, error: err.message };
    }
}

export const getDiscountsByCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_DISCOUNTS_BY_CATEGORY_REQUEST' });
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/discounts/category/${categoryId}`
        );
        const data = response.data;
        dispatch({ type: 'FETCH_DISCOUNTS_BY_CATEGORY_SUCCESS', payload: data });
        return { success: true, data };
    } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_DISCOUNTS_BY_CATEGORY_FAILURE' });
        return { success: false, error: err.message };
    }
}

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page
});