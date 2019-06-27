import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  campgroundsData: {
    currentCount: 0,
    totalCount: 0,
    searchParamsLimit: 20,
    searchParamsOffset: 0,
    searchParamsQuery: "",
    allCampgrounds: []
  },

  searchState: "",
  currentCampground: {},
  error: null,
  loading: false,
  loadingCampground: false
};

const getCampgroundsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getCampgroundsSuccess = (state, action) => {
  const data = {
    ...initialState.campgroundsData
  };

  data.currentCount = action.payload.METADATA.RESULTS.CURRENT_COUNT;
  data.totalCount = action.payload.METADATA.RESULTS.TOTAL_COUNT;
  data.searchParamsLimit = action.payload.METADATA.SEARCH_PARAMETERS.LIMIT;
  data.searchParamsOffset = action.payload.METADATA.SEARCH_PARAMETERS.OFFSET;
  data.searchParamsQuery = action.payload.METADATA.SEARCH_PARAMETERS.QUERY;
  data.allCampgrounds = action.payload.RECDATA;

  return updateObject(state, {
    campgroundsData: data,
    loading: false
  });
};

const getCampgroundsFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false
  });
};

const getCampground = (state, action) => {
  return updateObject(state, { currentCampground: action.payload });
};

const getCampgroundStart = (state, action) => {
  return updateObject(state, { loadingCampground: true });
};

const getCampgroundSuccess = (state, action) => {
  return updateObject(state, {
    currentCampground: action.payload,
    loadingCampground: false
  });
};

const getCampgroundFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loadingCampground: false
  });
};

const updateSearchState = (state, action) => {
  return updateObject(state, { searchState: action.payload });
};

const campgroundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CAMPGROUNDS_START:
      return getCampgroundsStart(state, action);
    case actionTypes.GET_CAMPGROUNDS_SUCCESS:
      return getCampgroundsSuccess(state, action);
    case actionTypes.GET_CAMPGROUNDS_FAIL:
      return getCampgroundsFail(state, action);
    case actionTypes.GET_CAMPGROUND:
      return getCampground(state, action);
    case actionTypes.GET_CAMPGROUND_START:
      return getCampgroundStart(state, action);
    case actionTypes.GET_CAMPGROUND_SUCCESS:
      return getCampgroundSuccess(state, action);
    case actionTypes.GET_CAMPGROUND_FAIL:
      return getCampgroundFail(state, action);
    case actionTypes.UPDATE_SEARCHSTATE:
      return updateSearchState(state, action);
    default:
      return state;
  }
};

export default campgroundsReducer;
