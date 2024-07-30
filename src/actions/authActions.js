import axios from '../customize/axios'
import { setToken, removeToken, getToken } from '../services/tokenService'
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
        toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản, mật khẩu')
        // alert('Login that bai')
    }
};

export const singleSignOn = () => async (dispatch) => {
    try {
        const userResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/details`)
        const userResponseJSON = JSON.stringify(userResponse.data) 
        setUser(userResponseJSON)
        dispatch({ type: 'LOGIN_SUCCESS', payload: {user: userResponse.data} })
        await toast.success('Đăng nhập thành công!')
    }
    catch (err) {
        console.log(err)
        toast.error('Đăng nhập thất bại, vui lòng thử lại!')
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/logout`,null, {
            params: {token: getToken()}
        })
        removeToken();
        removeUser();
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch({ type: 'LOGOUT' });
        toast.success('Đăng xuất thành công!')
    }
    catch (err) {
        console.log(err)
        toast.error('Đăng xuất thất bại!')
    }
    
};