import { ADD_HIRE_FAILURE, ADD_HIRE_REQUEST, ADD_HIRE_SUCCESS } from '../actions/action.types';

const initialState = {
    loading: false,
    hired: null,
    error: ''
};

const hireReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HIRE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_HIRE_SUCCESS:
            return {
                ...state,
                loading: false,
                hired: action.payload,
                error: ''
            };
        case ADD_HIRE_FAILURE:
            return {
                ...state,
                loading: false,
                hired: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default hireReducer;
