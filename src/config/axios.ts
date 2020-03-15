import axios from 'axios';
import history from './history';

const appID = 'DAsm1BepFyYGemHNRk9BTqKF';
const appSecret = '7EL2hLAt2xw2CHXiKEqqYEZK';
/* tslint:disable:no-string-literal */

const instance = axios.create({
    baseURL: '',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});
// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    const xToken = localStorage.getItem('x-token');
    if(xToken) {
        config.headers['Authorization'] = `Bearer ${xToken}`;
    }
    return config;
  }, (error) => {
    // Do something with request error
    console.error(error)
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.headers['x-token']) {
        localStorage.setItem('x-token', response.headers['x-token'])
    }
    return response;
  }, (error) => {
    if(error.response.status === 401){
      // window.location.href='/login'
      history.push('/login')
      console.log('重定向')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
/* tslint:enable:no-string-literal */
export default instance;