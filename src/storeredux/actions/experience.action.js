import API from "../../configs/api";
import { FETCH_EXPERIENCE_FAILURE, FETCH_EXPERIENCE_REQUEST, FETCH_EXPERIENCE_SUCCESS } from "./action.types";

const fetchExperienceRequest = () => ({
    type: FETCH_EXPERIENCE_REQUEST
});

const fetchExperienceSuccess = (data) => ({
    type: FETCH_EXPERIENCE_SUCCESS,
    payload: data
});

const fetchExperienceFailure = (error) => ({
    type: FETCH_EXPERIENCE_FAILURE,
    payload: error
})


export const fetchExperience = () => {
    return async (dispatch) => {
        dispatch(fetchExperienceRequest());
        try {
            const res = await API.get('/experience');
            dispatch(fetchExperienceSuccess(res.data.data));
        } catch (error) {
            dispatch(fetchExperienceFailure(error.message));
        }
    }
}