import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import API from '../../configs/api';
import Cookies from 'js-cookie';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from './action.types';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginAction = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await API.post(`/users/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, refreshToken, role } = response.data.data;
        Cookies.set('token', token);
        Cookies.set('refreshToken', refreshToken);
        dispatch(loginSuccess(response.data));
        if (role === 'worker') {
          navigate('/workers/home');
        } else if (role === 'recruiter') {
          navigate('/recruiters/home');
        } else {
          toast.error('Unknown user role.');
        }
      } else {
        dispatch(loginFailure('Login failed. Please try again.'));
        toast.error('Your Email & Password is incorrect. Please try again.');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error('Your Email & Password is incorrect. Please try again.');
    }
  };
};
