import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
  campgrounds: [],
  currentCampground: {},
  error: null,
  loading: false
};

const getCampgroundsStart = (state, action) => {
  console.log('%c Loading_campgrounds...', 'color: red');
  return updateObject(state, { loading: true });
};

const getCampgroundsSuccess = (state, action) => {
  console.log('%c GetCampground_SUCCESS...', 'color: red', action.payload);
  return updateObject(state, {
    campgrounds: action.payload,
    loading: false
  });
};

const getCampgroundsFail = (state, action) => {
  console.log('%c GetCampground_FAIL: %s', 'color: red', action.payload);
  return updateObject(state, {
    error: action.payload,
    loading: false
  });
};

const campgroundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CAMPGROUNDS_START:
      return getCampgroundsStart(state, action);
    case actionTypes.GET_CAMPGROUNDS_SUCCESS:
      return getCampgroundsSuccess(state, action);
    case actionTypes.GET_CAMPGROUNDS_FAIL:
      return getCampgroundsFail(state, action);
    default:
      console.log(
        '%c Default campgrounds: %s',
        'color: red',
        state.campgrounds
      );
      return state;
  }
};

export default campgroundsReducer;
