import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
  currentUser: [],
  loggedIn: false,
  authenticatingUser: false,
  loginFailed: false,
  error: null
};

const setCurrentUser = (state, action) => {
  console.log('%c Set_current_user: %s', 'color: red', action.payload);
  return updateObject(state, {
    currentUser: action.payload,
    loggedIn: true,
    authenticatingUser: false
  });
};

const authenticatingUser = (state, action) => {
  //tells the app we're fetching
  console.log('%c Authenticating_user...', 'color: red');
  return updateObject(state, { authenticatingUser: true });
};

const authenticatedUser = (state, action) => {
  console.log('%c Authenticated_user: ', 'color: red');
  return updateObject(state, { authenticatingUser: false });
};

const failedLogin = (state, action) => {
  console.log('%c Failed_login: %s', 'color: red', action.payload);
  return updateObject(state, {
    loginFailed: true,
    error: action.payload,
    authenticatingUser: false
  });
};

const resetLoginError = (state, action) => {
  console.log('%c resetLoginError: ', 'color: red');
  return updateObject(state, { loginFailed: false, error: null });
};

const addFavorite = (state, action) => {
  const updatedFavorites = state.currentUser.favorite_campgrounds.concat(
    action.payload
  );
  console.log(
    '%c addFavoriteCampgrounds...',
    'color: red',
    action,
    state,
    updatedFavorites
  );

  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      favorite_campgrounds: updatedFavorites
    }
  });
};

const deleteFavorite = (state, action) => {
  const updatedFavorites = state.currentUser.favorite_campgrounds.filter(
    favorite => favorite.FacilityID !== action.payload
  );

  console.log(
    '%c deleteFavoriteCampgrounds...',
    'color: red',
    action,
    state,
    updatedFavorites
  );
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      favorite_campgrounds: updatedFavorites
    }
  });
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    case actionTypes.AUTHENTICATING_USER:
      return authenticatingUser(state, action);
    case actionTypes.AUTHENTICATED_USER:
      return authenticatedUser(state, action);
    case actionTypes.FAILED_LOGIN:
      return failedLogin(state, action);
    case actionTypes.LOGOUT:
      return initialState;
    case actionTypes.RESET_LOGIN_ERROR:
      return resetLoginError(state, action);
    case actionTypes.ADD_FAVORITE:
      return addFavorite(state, action);
    case actionTypes.DELETE_FAVORITE:
      return deleteFavorite(state, action);
    default:
      console.log('%c Initial user: %s', 'color: red', state.currentUser);
      return state;
  }
};

export default usersReducer;
