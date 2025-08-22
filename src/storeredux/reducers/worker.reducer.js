import {FETCH_WORKER_REQUEST, FETCH_WORKER_SUCCESS, FETCH_WORKER_FAILURE} from '../actions/action.types';

const initialState = {
    loading: false,
    profile: {},
    error: '',
  };
  
  const workersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WORKER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_WORKER_SUCCESS:
        return {
          loading: false,
          profile: action.payload,
          error: '',
        };
      case FETCH_WORKER_FAILURE:
        return {
          loading: false,
          profile: {},
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default workersReducer;
  