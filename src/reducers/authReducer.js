import { getUser } from "../services/authService";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: getUser(),
    userId: null,
    roleId: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                userId: action.payload.user_id,
                roleId: action.payload.role_id
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                userId: null,
                roleId: null
            };
        default:
            return state;
    }
};

export default authReducer;
