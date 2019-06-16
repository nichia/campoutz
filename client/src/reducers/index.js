import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import campgroundsReducer from './campgroundsReducer';
import campgroundSitesReducer from './campgroundSitesReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  // userCampgrounds: favoriteCampgroundsReducer,
  campgrounds: campgroundsReducer,
  campsites: campgroundSitesReducer
});

export default rootReducer;
