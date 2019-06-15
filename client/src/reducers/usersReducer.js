import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
  currentUser: null,
  loggedIn: false,
  authenticatingUser: false,
  loginFailed: false,
  error: null
};

const addFavorite = (state, action) => {
  console.log('%c addFavoriteCampgrounds...', 'color: red', action, state);
  return updateObject(state, {
    favorite_campgrounds: state.favorite_campgrouds.concat(action.payload)
  });
};

const deleteFavorite = (state, action) => {
  console.log('%c deleteFavoriteCampgrounds...', 'color: red', action, state);
  const updatedFavorites = {
    favorites: state.favorite_campgrounds.filter(
      favorite => favorite.campground_ridb_id !== action.payload
    )
  };
  return updateObject(state, { favorite_campgrounds: updatedFavorites });
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      return addFavorite(state, action);
    case actionTypes.DELETE_FAVORITE:
      return deleteFavorite(state, action);
    case actionTypes.SET_CURRENT_USER:
      console.log('%c Set_current_user: %s', 'color: red', action.payload);

      //action.payload { username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url' }
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
        authenticatingUser: false
      };
    case actionTypes.AUTHENTICATING_USER: //tells the app we're fetching
      console.log('%c Authenticating_user...', 'color: red');

      return { ...state, authenticatingUser: true };
    case actionTypes.AUTHENTICATED_USER:
      console.log('%c Authenticated_user: ', 'color: red');

      return { ...state, authenticatingUser: false };
    case actionTypes.FAILED_LOGIN: //for error handling
      console.log('%c Failed_login: %s', 'color: red', action.payload);

      return {
        ...state,
        loginFailed: true,
        error: action.payload,
        authenticatingUser: false
      };
    case actionTypes.LOGOUT:
      console.log('%c Logout: %s', 'color: red', state.currentUser);

      return initialState;
    default:
      console.log('%c Initial user: %s', 'color: red', state.currentUser);
      return state;
  }
};

export default usersReducer;
