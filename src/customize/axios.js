import axios from "axios";
import { getToken, setRefreshToken, setToken } from "../services/tokenService";

const instance = axios.create({
  //baseURL: 'http://yourapi.com/api', // Thay bằng URL API của bạn
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("Check response: ", response);
  return response;
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await axios.post('http://localhost:8080/api/v1/users/refreshToken', {refresh_token:refreshToken});
    if (res.status === 200) {
      setToken(res.data.token);
      setRefreshToken(res.data.refresh_token)
      instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return instance(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default instance;