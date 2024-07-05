
const initialState = {
    isAuthenticated: false,
    token: null,
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
                userId: action.payload.user_id,
                roleId: action.payload.role_id
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null,
                roleId: null
            };
        default:
            return state;
    }
};

export default authReducer;
