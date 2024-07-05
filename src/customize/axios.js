import axios from "axios";
import { getToken } from "../services/tokenService";

const instance = axios.create({
    //baseURL: 'http://yourapi.com/api', // Thay bằng URL API của bạn
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken()
    if(token) {
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
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance;