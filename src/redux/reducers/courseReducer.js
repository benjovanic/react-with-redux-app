import * as types from '../actions/actionTypes';
import initialState from './initialState';

// eslint-disable-next-line default-param-last
const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) => (course.id === action.course.id ? action.course : course));
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_SUCCESS:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
};

export default courseReducer;
