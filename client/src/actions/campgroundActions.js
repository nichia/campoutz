import * as actionTypes from "./actionTypes";

const RIDB_URL = `${process.env.REACT_APP_API_RIDB_ENDPOINT}/api/v1`;
const RIDB_API_KEY = process.env.REACT_APP_RIDB_API_KEY;
const LIMIT = 12;

export const updateSearchState = query => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_SEARCHSTATE, payload: query });
  };
};

const getCampgroundsStart = () => {
  return { type: actionTypes.GET_CAMPGROUNDS_START };
};

const getCampgroundsSuccess = campgrounds => {
  return {
    type: actionTypes.GET_CAMPGROUNDS_SUCCESS,
    payload: campgrounds
  };
};

const getCampgroundsFail = error => {
  return { type: actionTypes.GET_CAMPGROUNDS_FAIL, payload: error };
};

export const getCampground = campground => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_CAMPGROUND, payload: campground });
  };
};

const getCampgroundStart = () => {
  return { type: actionTypes.GET_CAMPGROUND_START };
};

const getCampgroundSuccess = campground => {
  return {
    type: actionTypes.GET_CAMPGROUND_SUCCESS,
    payload: campground
  };
};

const getCampgroundFail = error => {
  return { type: actionTypes.GET_CAMPGROUND_FAIL, payload: error };
};

export const fetchCampground = campgroundID => {
  const fullDetails = "true";

  const options = {
    method: "GET",
    headers: {
      apikey: `${RIDB_API_KEY}`,
      accept: "application/json"
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `${RIDB_URL}/facilities/${campgroundID}?full=${fullDetails}`;

  return dispatch => {
    dispatch(getCampgroundStart());

    fetch(proxyurl + url, options)
      // https://cors-anywhere.herokuapp.com/https://...
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // promise will reject and the chained catch call will be
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      .then(JSONResponse => {
        return dispatch(getCampgroundSuccess(JSONResponse));
      })
      .catch(error => {
        return dispatch(getCampgroundFail(error));
      });
  };
};

export const fetchCampgrounds = (query, page) => {
  const offset = page > 1 ? (page - 1) * LIMIT : 0;
  const fullDetails = "true";

  const options = {
    method: "GET",
    headers: {
      apikey: `${RIDB_API_KEY}`,
      accept: "application/json"
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `${RIDB_URL}/facilities?limit=${LIMIT}&offset=${offset}&full=${fullDetails}&state=${query}&activity=CAMPING`;
  // site that doesn’t send Access-Control-*
  return dispatch => {
    dispatch(getCampgroundsStart());

    fetch(proxyurl + url, options)
      // https://cors-anywhere.herokuapp.com/https://...
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // promise will reject and the chained catch call will be
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      .then(JSONResponse => {
        return dispatch(getCampgroundsSuccess(JSONResponse));
      })
      .catch(error => {
        return dispatch(getCampgroundsFail(error));
      });
  };
};
