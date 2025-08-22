import {
    CHECK_ROLE_REQUEST,
    CHECK_ROLE_SUCCESS,
    CHECK_ROLE_FAILURE,
  } from '../actions/action.types';
  
  const initialState = {
    loading: false,
    user: null,
    role: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_ROLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CHECK_ROLE_SUCCESS:
        return {
          ...state,
          loading: false,
          role: action.payload,
        };
      case CHECK_ROLE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  