import * as actionTypes from './actionTypes';

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1`;

// action creators //

const add_to_favorites = campgroundData => {
  return {
    type: actionTypes.ADD_FAVORITE,
    campgroundData: campgroundData
  };
};

// async action creators //

export const addFavoriteCampground = campgroundData => {
  const url = `${BASE_URL}/favorite_campgrounds`;

  const options = {
    //TODO: move this to an adapter
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ campground: campgroundData })
  };
  return dispatch => {
    console.log('%c addFavoriteCampground: ', 'color: navy', url);
    fetch(url, options)
      .then(response => response.json())
      .then(JSONResponse => {
        console.log(
          '%c addFavoriteCampground Success: ',
          'color: navy',
          JSONResponse.user
        );
        dispatch(add_to_favorites(JSONResponse.user));
      })
      .catch(error => {
        console.log(
          '%c addFavoriteCampground ERR RESP: ',
          'color: navy',
          error
        );
        // TypeError is returned by fail fetch and will have error.message
        const errorMsg = error instanceof TypeError ? error.message : error;
        // dispatch(failedLogin(errorMsg));
      });
  };
};

export const deleteFavoriteCampground = favoriteData => {
  const id = favoriteData.id;
  const url = `${BASE_URL}/favorite_campgrounds/${id}`;

  const options = {
    //TODO: move this to an adapter
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return dispatch => {
    console.log('%c deleteFavoriteCampground: ', 'color: navy', url);
    fetch(url, options)
      .then(response => response.json())
      .then(JSONResponse => {
        console.log(
          '%c deleteFavoriteCampground Success: ',
          'color: navy',
          JSONResponse.user
        );
        dispatch(add_to_favorites(JSONResponse.user));
      })
      .catch(error => {
        console.log(
          '%c deleteFavoriteCampground ERR RESP: ',
          'color: navy',
          error
        );
        // TypeError is returned by fail fetch and will have error.message
        const errorMsg = error instanceof TypeError ? error.message : error;
        // dispatch(failedLogin(errorMsg));
      });
  };
};
