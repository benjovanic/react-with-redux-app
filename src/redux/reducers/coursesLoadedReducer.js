import * as types from '../actions/actionTypes';
import initialState from './initialState';

const coursesLoadedReducer = (state = initialState.coursesLoaded, action) => {
  if (action.type === types.LOAD_COURSES_SUCCESS) {
    return true;
  }
  return state;
};

export default coursesLoadedReducer;
