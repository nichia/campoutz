import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
  favoriteCampgrounds: [],
  error: null
};

const addFavorite = (state, action) => {
  console.log('%c addToSavedCampgrounds...', 'color: red');
  return updateObject(state, {
    favoriteCampgrounds: state.favoriteCampgrouds.concat(action.payload)
  });
};

const deleteFavorite = (state, action) => {
  console.log('%c addToSavedCampgrounds...', 'color: red');
  const updatedFavorites = {
    favorites: state.favoriteCampgrounds.filter(
      favorite => favorite.id !== action.id
    )
  };
  return updateObject(state, { favoriteCampgrounds: updatedFavorites });
};

const favoriteCampgroundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      return addFavorite(state, action);
    case actionTypes.DELETE_FAVORITE:
      return deleteFavorite(state, action);
    default:
      console.log(
        '%c Initial FavoriteCampgrounds Reducer: %s',
        'color: red',
        state
      );
      return state;
  }
};

export default favoriteCampgroundsReducer;
