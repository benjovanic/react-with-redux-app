import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const loadCoursesSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses,
});

export const updateCourseSuccess = (course) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course,
});

export const createCourseSuccess = (course) => ({
  type: types.CREATE_COURSE_SUCCESS,
  course,
});

export const deleteCourseSuccess = (course) => ({
  type: types.DELETE_COURSE_SUCCESS,
  course,
});

export const loadCourses = () => (dispatch) => {
  dispatch(beginApiCall());
  return courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const saveCourse = (course) => (dispatch) => {
  dispatch(beginApiCall());
  return courseApi
    .saveCourse(course)
    .then((savedCourse) => (course.id
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse))))
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const deleteCourse = (course) => (dispatch) => {
  dispatch(beginApiCall());
  return courseApi
    .deleteCourse(course.id)
    .then(() => {
      dispatch(deleteCourseSuccess(course));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};
