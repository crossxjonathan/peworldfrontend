import API from "../../configs/api";
import {
  FETCH_RECRUITER_REQUEST,
  FETCH_RECRUITER_SUCCESS,
  FETCH_RECRUITER_FAILURE,
  UPDATE_RECRUITER_SUCCESS,
  UPDATE_RECRUITER_PHOTO_SUCCESS,
} from "./action.types";

const fetchRecruiterRequest = () => ({
  type: FETCH_RECRUITER_REQUEST,
});

const fetchRecruiterSuccess = (profile) => ({
  type: FETCH_RECRUITER_SUCCESS,
  payload: profile,
});

const fetchRecruiterFailure = (error) => ({
  type: FETCH_RECRUITER_FAILURE,
  payload: error,
});

const updateRecruiterSuccess = (data) => ({
  type: UPDATE_RECRUITER_SUCCESS,
  payload: data,
});

const updateRecruiterPhotoSuccess = (data) => ({
  type: UPDATE_RECRUITER_PHOTO_SUCCESS,
  payload: data,
});

export const fetchRecruiter = () => async (dispatch) => {
  dispatch(fetchRecruiterRequest());
  try {
    const res = await API.get('/recruiters/profile');
    dispatch(fetchRecruiterSuccess(res.data.profile));
  } catch (error) {
    dispatch(fetchRecruiterFailure(error.message));
  }
};

export const updateRecruiterProfile = (updateData) => async (dispatch) => {
  try {
    const res = await API.put('/recruiters/profile', updateData);
    dispatch(updateRecruiterSuccess(res.data));
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export const updateRecruiterPhotoProfile = (imageFile) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('photo', imageFile);

    const res = await API.put('/recruiters/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(updateRecruiterPhotoSuccess(res.data));
  } catch (error) {
    console.error('Error updating photo profile:', error);
  }
};
