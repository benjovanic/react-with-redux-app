import * as types from '../actions/actionTypes';
import initialState from './initialState';

// eslint-disable-next-line default-param-last
const authorsLoadedReducer = (state = initialState.authorsLoaded, action) => {
  if (action.type === types.LOAD_AUTHORS_SUCCESS) {
    return true;
  }
  return state;
};

export default authorsLoadedReducer;
