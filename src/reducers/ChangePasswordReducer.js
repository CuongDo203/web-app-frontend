const initialState = {
    isChangPasswordSuccessfully: false
}

const changePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PW_SUCCESSFULLY':
            return {
                ...state,
                isChangPasswordSuccessfully: true
            }
        case 'CHANGE_PW_FAILED':
            return {
                ...state,
                isChangPasswordSuccessfully: false
            }
        default:
            return state
    }
}

export default changePasswordReducer