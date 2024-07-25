import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../actions/ChangePassword';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPasswordForm() {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowRetypedPassword, setIsShowRetypedPassword] = useState(false)
    const [pw, setPw] = useState("")
    const [retypedPw, setRetypedPw] = useState("")
    const dispatch = useDispatch()
    const { isChangPasswordSuccessfully } = useSelector(state => state.changePwReducer)
    const location = useLocation()

    const handleTogglePw = () => {
        setIsShowPassword(!isShowPassword)
    }

    const handleChangePw = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        if (pw !== retypedPw) {
            toast.error('Password does not match')
            return
        }
        dispatch(changePassword(token, { pw, retypedPw }))
        if(isChangPasswordSuccessfully) {
            setPw("")
            setRetypedPw("")
        }
    }

    return (
        <Container id='reset-password-form' className='p-5'>
            <h1 className='text-center'>Change Your Password</h1>
            <Form className='p-3 mt-4' onSubmit={handleChangePw}>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword5">New password</Form.Label>
                    <Form.Group className='password-field-input'>
                        <Form.Control
                            type={!isShowPassword ? "password" : "text"}
                            require
                            id="inputPassword5"
                            placeholder='Enter yor new password'
                            pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.source}
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            title="Mật khẩu ít nhất 8 kí tự bao gồm chữ cái và số"
                        />
                        {!isShowPassword ? <FaEyeSlash className='password-toggle' onClick={() => handleTogglePw()} /> :
                            <FaEye className='password-toggle' onClick={() => handleTogglePw()} />}
                    </Form.Group>
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Label htmlFor="inputRetypedPassword5">Confirm your new password</Form.Label>
                    <Form.Group className='password-field-input'>
                        <Form.Control
                            placeholder='Retype the new password'
                            type={!isShowRetypedPassword ? "password" : "text"}
                            require
                            id="inputRetypedPassword5"
                            value={retypedPw}
                            onChange={(e) => setRetypedPw(e.target.value)}
                        />
                        {!isShowRetypedPassword ? <FaEyeSlash className='password-toggle' onClick={() => setIsShowRetypedPassword(!isShowRetypedPassword)} /> :
                            <FaEye className='password-toggle' onClick={() => setIsShowRetypedPassword(!isShowRetypedPassword)} />}
                    </Form.Group>
                </Form.Group>
                <Button variant='primary' type='submit' className='mt-4'>Change my password</Button>
            </Form>
        </Container>
    )
}

export default ResetPasswordForm
