/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
// import results from './modules/Fetch/reducers';

// Reducers of Navigation Part I
// import { OptionReducer, Tip, Histories } from './modules/NavPage/reducers'  // remove NavPage

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  // OptionReducer,
  // Tip,
  // Histories,
});
