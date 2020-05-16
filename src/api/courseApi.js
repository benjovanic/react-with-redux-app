import { handleResponse, handleError } from './apiUtils';

const baseUrl = `${process.env.API_URL}/courses/`;

export const getCourses = () => fetch(baseUrl)
  .then(handleResponse)
  .catch(handleError);

export const saveCourse = (course) => fetch(baseUrl + (course.id || ''), {
  method: course.id ? 'PUT' : 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(course),
})
  .then(handleResponse)
  .catch(handleError);

export const deleteCourse = (courseId) => fetch(baseUrl + courseId, { method: 'DELETE' })
  .then(handleResponse)
  .catch(handleError);
