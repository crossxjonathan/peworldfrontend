import {
  FETCH_RECRUITER_REQUEST,
  FETCH_RECRUITER_SUCCESS,
  FETCH_RECRUITER_FAILURE,
  UPDATE_RECRUITER_SUCCESS,
  UPDATE_RECRUITER_PHOTO_SUCCESS,
} from "../actions/action.types";

const initialState = {
  profile: {},
  loading: false,
  error: null,
};

const recruiterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECRUITER_REQUEST:
      return { ...state, loading: true };
    case FETCH_RECRUITER_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case FETCH_RECRUITER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_RECRUITER_SUCCESS:
      return { ...state, profile: action.payload };
    case UPDATE_RECRUITER_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photo: action.payload.photo } };
    default:
      return state;
  }
};

export default recruiterReducer;
