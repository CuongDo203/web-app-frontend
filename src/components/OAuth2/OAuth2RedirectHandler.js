import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setToken } from '../../services/tokenService';
import { useDispatch } from 'react-redux';
import { singleSignOn } from '../../actions/authActions';

function OAuth2RedirectHandler() {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch()

  useEffect(() => {
    const code = queryParams.get('code');
    if(code==='') {
      toast.error('Login failed!')
      navigate("/login", {replace: true})
    }
    else {
      setToken(code)
      dispatch(singleSignOn())
      navigate("/", {replace: true})
    }
  }, [])

  return (
    <div>
    </div>
  )
}

export default OAuth2RedirectHandler
