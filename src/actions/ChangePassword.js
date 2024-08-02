import { toast } from 'react-toastify';
import axios from '../customize/axios'

export const changePassword = (token, changPasswordDTO) => async (dispatch) => {
    try {
        console.log(changPasswordDTO)
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/change-password`,
            {
                password: changPasswordDTO.pw,
                retyped_password: changPasswordDTO.retypedPw
            }, 
            {
                params: { token }
            });
        dispatch({type: 'CHANGE_PW_SUCCESSFULLY'})
        toast.success('Change password successfully!')
    }
    catch (err) {
        console.log(err);
        dispatch({type: 'CHANGE_PW_FAILED'});
        toast.error('Change password failed!', err.message)
    }
}