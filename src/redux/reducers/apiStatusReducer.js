import * as types from '../actions/actionTypes';
import initialState from './initialState';

const actionTypeEndsInSuccess = (type) => type.substring(type.length - 8) === '_SUCCESS';

// eslint-disable-next-line default-param-last
const apiCallStatusReducer = (state = initialState.apiCallsInProgress, action) => {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }
  if (action.type === types.API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
};

export default apiCallStatusReducer;
