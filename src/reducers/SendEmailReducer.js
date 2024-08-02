const initialState = {
    isSendEmailSuccessfully: false,
    isLoading: false
}

const sendEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SENDING_EMAIL':
            return {
                ...state,
                isLoading: true
            }
        case 'SEND_EMAIL_SUCCESSFULLY':
            return {
                ...state,
                isSendEmailSuccessfully: true,
                isLoading: false
            }
        case 'SEND_EMAIL_FAILED':
            return {
                ...state,
                isSendEmailSuccessfully: false,
                isLoading: false
            }
        default:
            return state
    }
}

export default sendEmailReducer;