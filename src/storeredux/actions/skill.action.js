import API from "../../configs/api";
import { FETCH_SKILL_FAILURE, FETCH_SKILL_REQUEST, FETCH_SKILL_SUCCESS } from "./action.types";

const fetchSkillRequest = () => ({
    type: FETCH_SKILL_REQUEST
});

const fetchSkillSuccess = (data) => ({
    type: FETCH_SKILL_SUCCESS,
    payload: data
});

const fetchSkillFailure = (error) => ({
    type: FETCH_SKILL_FAILURE,
    payload: error
})


export const fetchSkill = () => {
    return async (dispatch) => {
        dispatch(fetchSkillRequest());
        try {
            const res = await API.get('/skills');
            console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<RES SKILLL');
            dispatch(fetchSkillSuccess(res.data.data));
        } catch (error) {
            dispatch(fetchSkillFailure(error.message));
        }
    }
}