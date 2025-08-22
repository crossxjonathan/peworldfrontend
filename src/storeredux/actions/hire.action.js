import API from "../../configs/api";
import { ADD_HIRE_FAILURE, ADD_HIRE_REQUEST, ADD_HIRE_SUCCESS } from '../actions/action.types';


export const hireWorker = (formData) => async (dispatch) => {
    dispatch({ type: ADD_HIRE_REQUEST });

    try {
        const res = await API.post('/hire', formData);
        dispatch({
            type: ADD_HIRE_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ADD_HIRE_FAILURE,
            payload: error.message
        });
        console.log(error.message);
    }
};