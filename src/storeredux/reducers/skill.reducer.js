import { FETCH_SKILL_FAILURE, FETCH_SKILL_REQUEST, FETCH_SKILL_SUCCESS } from '../actions/action.types';

const initialState = {
    loading: false,
    data: [],
    error: '',
  };
  
  const skillReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SKILL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SKILL_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: '',
        };
      case FETCH_SKILL_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default skillReducer;
  