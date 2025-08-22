import API from "../../configs/api";
import {FETCH_PORTFOLIO_FAILURE, FETCH_PORTFOLIO_REQUEST, FETCH_PORTFOLIO_SUCCESS} from '../actions/action.types';


const fetchPortfolioRequest = () => ({
    type: FETCH_PORTFOLIO_REQUEST
});

const fetchPortfolioSuccess = (data) => ({
    type: FETCH_PORTFOLIO_SUCCESS,
    payload: data
});

const fetchPortfolioFailure = (error) => ({
    type: FETCH_PORTFOLIO_FAILURE,
    payload: error
})


export const fetchPortfolio = () => {
    return async (dispatch) => {
        dispatch(fetchPortfolioRequest());
        try {
            const res = await API.get('/portfolio');
            dispatch(fetchPortfolioSuccess(res.data.data));
            console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<res');
          } catch (error) {
            dispatch(fetchPortfolioFailure(error.message));
          }
    }
}