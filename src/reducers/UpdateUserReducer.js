const initialState = {
    isUpdateSuccess: false
}

const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_SUCCESSFULLY': 
            return {
                ...state,
                isUpdateSuccess: true
            }
        case 'UPDATE_USER_FAILED':
            return {
                ...state,
                isUpdateSuccess: false
            }
        default:
            return state
    }
}

export default updateUserReducer