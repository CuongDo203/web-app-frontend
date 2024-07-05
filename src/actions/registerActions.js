import axios from '../customize/axios'

export const register = (userRegister) => async (dispatch) => {
    try {
        const data = {
            fullname: userRegister.name,
            phone_number: userRegister.phone,
            address: userRegister.address || '',
            password: userRegister.password,
            retype_password: userRegister.retypedPassword,
            date_of_birth: userRegister.dateOfBirth,
            facebook_account_id: userRegister.facebookAccountId || 0,
            google_account_id: userRegister.googleAccountId || 0,
            role_id: 1
        }
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {...data});
        if(response.status === 200 || response.status === 201) {
            dispatch({type: 'REGISTER_SUCCESS'})
        }
        else {
            dispatch({type: 'REGISTER_FAILED'});
        }
    }
    catch(err) {
        console.log('Register failed: ', err);
        dispatch({type: 'REGISTER_FAILED'});
    }
}