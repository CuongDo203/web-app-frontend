import axios from '../customize/axios'
import { setToken, removeToken } from '../services/tokenService'
import { setUserId, removeUserId, setRoleId, removeRoleId } from '../services/authService'

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, 
            {phone_number: username, password });
        const { token, user_id, role_id } = response.data;
        setToken(token);
        setUserId(user_id);
        setRoleId(role_id);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        alert('Login thanh cong')
    } catch (error) {
        console.error('Login failed', error);
        alert('Login that bai')
    }
};

export const logout = () => (dispatch) => {
    removeToken();
    removeUserId();
    removeRoleId();
    dispatch({ type: 'LOGOUT' });
};