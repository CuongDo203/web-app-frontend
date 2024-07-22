import axios from '../customize/axios'
import { setToken, removeToken } from '../services/tokenService'
import { setUser, removeUser } from '../services/authService'
import { toast } from 'react-toastify';

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, 
            {phone_number: username, password });
        const { token } = response.data;
        setToken(token);
        // setUserId(user_id);
        // setRoleId(role_id);
        const userResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/details`)
        const userResponseJSON = JSON.stringify(userResponse.data) 
        setUser(userResponseJSON)
        toast.success('Đăng nhập thành công!')
        dispatch({ type: 'LOGIN_SUCCESS', payload: {token: response.data, user: userResponse.data} });
    } catch (error) {
        console.error('Login failed', error);
        toast.error('Đăng nhập thất bại!')
        // alert('Login that bai')
    }
};

export const logout = () => (dispatch) => {
    removeToken();
    removeUser();
    dispatch({ type: 'LOGOUT' });
    toast.success('Đăng xuất thành công!')
};