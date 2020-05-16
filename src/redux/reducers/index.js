import { combineReducers } from 'redux';
import courses from './courseReducer';
import coursesLoaded from './coursesLoadedReducer';
import authors from './authorReducer';
import authorsLoaded from './authorsLoadedReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  courses,
  coursesLoaded,
  authors,
  authorsLoaded,
  apiCallsInProgress,
});

export default rootReducer;
