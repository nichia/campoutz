import * as actionTypes from './actionTypes';

const getCampgroundsStart = () => {
  return { type: actionTypes.GET_CAMPGROUNDS_START };
};

const getCampgroundsSuccess = campgrounds => {
  return { type: actionTypes.GET_CAMPGROUNDS_SUCCESS, payload: campgrounds };
};

const getCampgroundsFail = error => {
  return { type: actionTypes.GET_CAMPGROUNDS_FAIL, payload: error };
};

export const fetchCampgrounds = query => {
  const RIDB_URL = `${process.env.REACT_APP_API_RIDB_ENDPOINT}/api/v1`;
  const RIDB_API_KEY = process.env.REACT_APP_RIDB_API_KEY;

  const options = {
    method: 'GET',
    headers: {
      apikey: `${RIDB_API_KEY}`,
      accept: 'application/json'
    }
  };

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const url = `${RIDB_URL}/facilities?limit=50&offset=0&full=false&state=${query}&activity=CAMPING&lastupdated=10-01-20181-2018`; // site that doesn’t send Access-Control-*

  return dispatch => {
    console.log(
      '%c fetchCampgrounds: ',
      'color: navy',
      `${RIDB_URL}`,
      `${url}`
    );

    dispatch(getCampgroundsStart());

    fetch(proxyurl + url, options) // https://cors-anywhere.herokuapp.com/https://...
      .then(response => {
        console.log('%c fetchCampgrounds 1: ', 'color: navy', response);
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
        console.log('%c fetchCampgrounds 2: ', 'color: navy', JSONResponse);
        return dispatch(getCampgroundsSuccess(JSONResponse));
      })
      .catch(error => {
        console.log('%c fetchCampgrounds ERR RESP: ', 'color: navy', error);
        return dispatch(getCampgroundsFail(error));
      });
  };
};
