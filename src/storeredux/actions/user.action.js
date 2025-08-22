import API from '../../configs/api';
import {
  CHECK_ROLE_REQUEST,
  CHECK_ROLE_SUCCESS,
  CHECK_ROLE_FAILURE,
} from './action.types';

const checkRoleRequest = () => ({
  type: CHECK_ROLE_REQUEST,
});

const checkRoleSuccess = (role) => ({
  type: CHECK_ROLE_SUCCESS,
  payload: role,
});

const checkRoleFailure = (error) => ({
  type: CHECK_ROLE_FAILURE,
  payload: error,
});

export const checkUserRole = () => {
  return async (dispatch) => {
    dispatch(checkRoleRequest());
    try {
      const response = await API.get('/users/check-role');
      const { role } = response.data.data;
      console.log(role, '<<<<<<<<<<<<<<<<<role');
      dispatch(checkRoleSuccess(role));
    } catch (error) {
      dispatch(checkRoleFailure(error.message));
    }
  };
};
