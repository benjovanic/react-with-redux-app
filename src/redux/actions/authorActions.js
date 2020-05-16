import * as types from './actionTypes';
import { getAuthors } from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const loadAuthorsSuccess = (authors) => ({ type: types.LOAD_AUTHORS_SUCCESS, authors });

export const loadAuthors = () => (dispatch) => {
  dispatch(beginApiCall());
  return getAuthors()
    .then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};
