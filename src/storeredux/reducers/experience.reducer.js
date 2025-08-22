import { FETCH_EXPERIENCE_FAILURE, FETCH_EXPERIENCE_REQUEST, FETCH_EXPERIENCE_SUCCESS } from '../actions/action.types';

const initialState = {
    loading: false,
    data: [],
    error: '',
  };
  
  const experienceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EXPERIENCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_EXPERIENCE_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: '',
        };
      case FETCH_EXPERIENCE_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default experienceReducer;
  