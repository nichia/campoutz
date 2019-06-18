import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import campgroundsReducer from './campgroundsReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  campgrounds: campgroundsReducer
});

export default rootReducer;
