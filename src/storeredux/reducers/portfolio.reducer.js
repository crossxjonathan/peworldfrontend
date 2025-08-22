import {FETCH_PORTFOLIO_FAILURE, FETCH_PORTFOLIO_REQUEST, FETCH_PORTFOLIO_SUCCESS} from '../actions/action.types';

const initialState = {
    loading: false,
    data: [],
    error: '',
  };
  
  const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PORTFOLIO_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PORTFOLIO_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: '',
        };
      case FETCH_PORTFOLIO_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default portfolioReducer;
  