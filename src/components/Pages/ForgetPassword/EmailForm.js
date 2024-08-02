import React, { useState } from 'react'
import { Container, Form, Button, Spinner } from 'react-bootstrap'
import './ForgetPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../../../actions/SendEmail';
import { useNavigate } from 'react-router-dom';

function EmailForm() {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const { isSendEmailSuccessfully, isLoading } = useSelector(state => state.emailReducer)
    const navigate = useNavigate()

    const handleSendEmail = () => {
        dispatch(sendEmail(email))
    }

    return (
        <Container id='email-form' className='p-5'>
            <h1 className='text-center'>Forget Password</h1>
            <Form className='p-3 mt-4'>
                <Form.Group controlId="formBasicEmail">
                    {isSendEmailSuccessfully && <Form.Label className='text-warning' >We will be sending a reset password link to your email.</Form.Label>}
                    <Form.Control required type="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                </Form.Group>
                <Button variant="primary" className='mt-3' onClick={() => handleSendEmail()}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Send'}
                </Button>
                <Button variant='secondary' className='mt-2'  disabled={isLoading} 
                    onClick={() => navigate('/login')}>Back</Button>
            </Form>
        </Container>
    )
}

export default EmailForm
