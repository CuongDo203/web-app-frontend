import axios from '../customize/axios'

export const sendEmail = (email) => async (dispatch) => {
    try {
        dispatch({type: 'SENDING_EMAIL'})
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/forget-password`,null,{
            params: {
                email: email
            }
        });
        dispatch({type: 'SEND_EMAIL_SUCCESSFULLY'})
    }
    catch (err){
        dispatch({type: 'SEND_EMAIL_FAILED'})
        console.log(err)
    }
}