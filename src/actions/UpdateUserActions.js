import axios from '../customize/axios'

export const updateUser = (userId, updateUserDTO) => async (dispatch) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/details/${userId}`, {
            fullname: updateUserDTO.fullname,
            address: updateUserDTO.address,
            date_of_birth: updateUserDTO.dateOfBirth,
            password: updateUserDTO.password,
            retyped_password: updateUserDTO.retypedPassword
        })
        console.log('user updated: ', response.data)
        dispatch({type: 'UPDATE_USER_SUCCESSFULLY'})
    }
    catch (err) {
        console.log(err)
        dispatch({type: 'UPDATE_USER_FAILED'})
    }
}