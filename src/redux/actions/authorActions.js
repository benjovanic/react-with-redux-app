import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const loadAuthorsSuccess = (authors) => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  authors,
});

export const updateAuthorSuccess = (author) => ({
  type: types.UPDATE_AUTHOR_SUCCESS,
  author,
});

export const createAuthorSuccess = (author) => ({
  type: types.CREATE_AUTHOR_SUCCESS,
  author,
});

export const deleteAuthorSuccess = (author) => ({
  type: types.DELETE_AUTHOR_SUCCESS,
  author,
});

export const loadAuthors = () => (dispatch) => {
  dispatch(beginApiCall());
  return authorApi
    .getAuthors()
    .then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const saveAuthor = (author) => (dispatch) => {
  dispatch(beginApiCall());
  return authorApi
    .saveAuthor(author)
    .then((savedAuthor) => (author.id
      ? dispatch(updateAuthorSuccess(savedAuthor))
      : dispatch(createAuthorSuccess(savedAuthor))))
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const deleteAuthor = (author) => (dispatch) => {
  dispatch(beginApiCall());
  return authorApi
    .deleteAuthor(author.id)
    .then(() => {
      dispatch(deleteAuthorSuccess(author));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};
