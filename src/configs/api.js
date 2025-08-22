import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: import.meta.env.VITE_URL_PEWORD
});

API.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

API.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      try {
        const response = await API.post('/users/refresh-token', { token: refreshToken });
        const { token } = response.data;
        Cookies.set('token', token);
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return API(originalRequest);
      } catch (err) {
        console.error('Refresh token error: ', err);
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    }
  }
  return Promise.reject(error);
});

export default API;