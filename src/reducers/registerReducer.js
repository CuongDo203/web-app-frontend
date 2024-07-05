let isRegisterSuccessfully = false

const registerReducer = (state = isRegisterSuccessfully, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return state = true;
        case 'REGISTER_FAILED':
            return state = false;
        default:
            return state;
    }
}

export default registerReducer