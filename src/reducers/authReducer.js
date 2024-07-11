import { getUser } from "../services/authService";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: getUser(),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer;
