import API from '../../configs/api';
import {FETCH_WORKER_FAILURE, FETCH_WORKER_REQUEST, FETCH_WORKER_SUCCESS, UPDATE_WORKER_PHOTO_SUCCESS, UPDATE_WORKER_SUCCESS} from './action.types';


const fetchWorkerRequest = () => ({
    type: FETCH_WORKER_REQUEST
});

const fetchWorkerSuccess = (profile) => ({
    type: FETCH_WORKER_SUCCESS,
    payload: profile
});

const updateWorkerSuccess = (data) => ({
  type: UPDATE_WORKER_SUCCESS,
  payload: data
})

const updateWorkerPhotoSuccess = (data) => ({
  type: UPDATE_WORKER_PHOTO_SUCCESS,
  payload: data
})

const fetchWorkerFailure = (error) => ({
    type: FETCH_WORKER_FAILURE,
    payload: error
});

export const fetchWorkers = () => {
    return async (dispatch) => {
      dispatch(fetchWorkerRequest());
      try {
        const response = await API.get('/workers/profile');
        dispatch(fetchWorkerSuccess(response.data.profile));
      } catch (error) {
        dispatch(fetchWorkerFailure(error.message));
      }
    };
  };


  export const updateWorkerProfile = (updateData) => async (dispatch) => {
    try {
      const res = await API.put('/workers/profile', updateData);
      dispatch(updateWorkerSuccess(res.data.data));
    } catch (error) {
      dispatch(fetchWorkerFailure('Error updating profile:', error));
    }
  };
  
  export const updateWorkerPhotoProfile = (imageFile) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', imageFile);
      const res = await API.put('/workers/profile/photo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(updateWorkerPhotoSuccess(res.data.data));
} catch (error) {
      dispatch(fetchWorkerFailure('Error updating photo profile:', error));
    }
  };