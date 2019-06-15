import * as actionTypes from './actionTypes';

const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1`;

// action creators //

export const setCurrentUser = useroptions => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: useroptions
});

export const failedLogin = errorMsg => {
  console.log('%c failedLogin', 'color: navy', errorMsg);

  return { type: actionTypes.FAILED_LOGIN, payload: errorMsg };
};

// tell our app we're currently fetching
export const authenticatingUser = () => {
  console.log('%c INSIDE authenticatingUser action/user', 'color: navy');
  return { type: actionTypes.AUTHENTICATING_USER };
};

export const logoutUser = () => {
  console.log('%c INSIDE LOGOUT action/user', 'color: navy');
  localStorage.removeItem('jwt');
  return { type: actionTypes.LOGOUT };
};

// async action creators //

export const /*FUNCTION*/ signupUser = props => {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      bio,
      avatar
    } = props;

    const url = `${BASE_URL}/users`;

    const options = {
      //TODO: move this to an adapter
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          bio: bio,
          avatar: avatar
        }
      })
    };

    return /*FUNCTION*/ dispatch => {
      //thunk
      console.log(
        '%c signupUser: ',
        'color: navy',
        process.env.REACT_APP_API_ENDPOINT
      );

      // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`)
      // adapter.signupUser(username, email, password)
      // http://localhost:3000

      fetch(url, options)
        .then(response => response.json())
        .then(JSONResponse => {
          if (JSONResponse.jwt) {
            console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONResponse);
            /* { user: { username: 'chandler bing', bio: '', avatar: ''}, jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'} */
            localStorage.setItem('jwt', JSONResponse.jwt);
            dispatch(setCurrentUser(JSONResponse.user));
            // dispatch({
            //   type: actionTypes.SET_CURRENT_USER,
            //   payload: JSONResponse.user
            // });
          } else {
            console.log('%c signUP JWT RESP: ', 'color: navy', JSONResponse);
            // dispatch(failedLogin(JSONResponse.error));
            // promise will reject (throw) and the chained catch call will be invoked
            // return Promise.reject({
            //   message: JSONResponse.error
            // });
            throw JSONResponse.error;
          }
        })
        .catch(error => {
          console.log('%c signUP ERR RESP: ', 'color: navy', error);
          // TypeError is returned by fail fetch and will have error.message
          const errorMsg = error instanceof TypeError ? error.message : error;
          dispatch(failedLogin(errorMsg));
          // dispatch({ type: actionTypes.FAILED_LOGIN, payload: error.message })
        });
    };
  };

export const /*FUNCTION*/ loginUser = props => {
    const { username, password } = props;

    const url = `${BASE_URL}/login`;

    const options = {
      //TODO: move this to an adapter
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    };

    return /*FUNCTION*/ dispatch => {
      //thunk
      console.log(
        '%c loginUser: ',
        'color: navy',
        process.env.REACT_APP_API_ENDPOINT
      );
      // dispatch({ type: actionTypes.AUTHENTICATING_USER });
      dispatch(authenticatingUser());

      // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`)
      // adapter.loginUser(username, password)
      // http://localhost:3000
      fetch(url, options)
        .then(response => response.json())

        //   {
        //   console.log('%c loginUser RESP: ', 'color: navy', response);
        //   if (response.ok) {
        //     return response.json();
        //   } else {
        //     throw response;
        //   }
        // })

        .then(JSONResponse => {
          if (JSONResponse.jwt) {
            console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONResponse);
            /* { user: { username: 'chandler bing', bio: '', avatar: ''}, jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'} */
            localStorage.setItem('jwt', JSONResponse.jwt);
            dispatch(setCurrentUser(JSONResponse.user));
            // dispatch({
            //   type: actionTypes.SET_CURRENT_USER,
            //   payload: JSONResponse.user
            // });
          } else {
            console.log('%c loginUser JWT RESP: ', 'color: navy', JSONResponse);
            // dispatch(failedLogin(JSONResponse.error));
            // promise will reject (throw) and the chained catch call will be invoked
            // return Promise.reject(JSONResponse.error);
            throw JSONResponse.error;
          }
        })
        .catch(error => {
          console.log('%c loginUser ERR RESP: ', 'color: navy', error);
          // TypeError is returned by fail fetch and will have error.message
          const errorMsg = error instanceof TypeError ? error.message : error;
          dispatch(failedLogin(errorMsg));
        });
    };
  };

export const fetchCurrentUser = () => {
  const url = `${BASE_URL}/profile`;

  // takes the token in localStorage and finds out who it belongs to
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return dispatch => {
    console.log(
      '%c fetchCurrentUser: ',
      'color: navy',
      process.env.REACT_APP_API_ENDPOINT
    );
    dispatch(authenticatingUser()); //tells the app we are fetching
    fetch(url, options)
      // fetch() won't reject HTTP error status such as 404 or 500,
      // Instead, resolve normally (with ok status set to false) => so reason for logic below
      // (only reject on network failure or anything prevenint the request from completing).
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(
            '%c fetCurrentUser !response.ok: ',
            'color: navy',
            response
          );
          // throw response;
          throw new Error('Network response was not ok: ', response);
        }
      })
      .then(JSONResponse => {
        console.log('%c fetCurrentUser: ', 'color: navy', JSONResponse.user);
        dispatch(setCurrentUser(JSONResponse.user));
      })
      .catch(error => {
        console.log('%c fetCurrentUser ERR RESP: ', 'color: navy', error);
        // TypeError is returned by fail fetch and will have error.message
        const errorMsg = error instanceof TypeError ? error.message : error;
        dispatch(failedLogin(errorMsg));
      });
  };
};

///////////////////////////////

// action creators //

const add_to_favorites = campgroundData => {
  return {
    type: actionTypes.ADD_FAVORITE,
    payload: campgroundData
  };
};

const delete_from_favorites = campgroundId => {
  return {
    type: actionTypes.DELETE_FAVORITE,
    payload: campgroundId
  };
};
// async action creators //

export const addFavoriteCampground = props => {
  const { FacilityID, FacilityName, FacilityDescription } = props;
  const url = `${BASE_URL}/favorite_campgrounds`;

  const options = {
    //TODO: move this to an adapter
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      campground: {
        campground_ridb_id: FacilityID,
        name: FacilityName,
        description: FacilityDescription
      }
    })
  };
  return dispatch => {
    console.log('%c addFavoriteCampground1: ', 'color: navy', url);
    fetch(url, options)
      // fetch() won't reject HTTP error status such as 404 or 500,
      // Instead, resolve normally (with ok status set to false) => so reason for logic below
      // (only reject on network failure or anything prevenint the request from completing).
      // .then(response => response.json())
      .then(response => {
        if (response.ok) {
          console.log(
            '%c addFavoriteCampground response.ok: ',
            'color: navy',
            response
          );
          return response.json();
        } else {
          console.log(
            '%c addFavoriteCampground !response.ok: ',
            'color: navy',
            response
          );
          // throw response;
          throw new Error('Network response was not ok: ', response);
        }
      })
      .then(JSONResponse => {
        console.log(
          '%c addFavoriteCampground2 Success: ',
          'color: navy',
          JSONResponse
        );
        dispatch(add_to_favorites(JSONResponse.campground));
      })
      .catch(error => {
        // TypeError is returned by fail fetch and will have error.message
        const errorMsg = error instanceof TypeError ? error.message : error;
        // dispatch(failedLogin(errorMsg));
        console.log(
          '%c addFavoriteCampground2 ERR RESP: ',
          'color: navy',
          error,
          errorMsg
        );
      });
  };
};

export const deleteFavoriteCampground = campground_ridb_id => {
  const url = `${BASE_URL}/favorite_campgrounds/${campground_ridb_id}`;

  const options = {
    //TODO: move this to an adapter
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  };
  return dispatch => {
    console.log('%c deleteFavoriteCampground1: ', 'color: navy', url);
    fetch(url, options)
      // fetch() won't reject HTTP error status such as 404 or 500,
      // Instead, resolve normally (with ok status set to false) => so reason for logic below
      // (only reject on network failure or anything prevenint the request from completing).
      // .then(response => response.json())
      .then(response => {
        if (response.ok) {
          console.log(
            '%c deleteFavoriteCampground response.ok: ',
            'color: navy',
            response
          );
          return response.json();
        } else {
          console.log(
            '%c deleteFavoriteCampground !response.ok: ',
            'color: navy',
            response
          );
          // throw response;
          throw new Error('Network response was not ok: ', response);
        }
      })
      .then(JSONResponse => {
        console.log(
          '%c deleteFavoriteCampground2 Success: ',
          'color: navy',
          JSONResponse
        );
        dispatch(delete_from_favorites(JSONResponse.campground_ridb_id));
      })
      .catch(error => {
        // TypeError is returned by fail fetch and will have error.message
        const errorMsg = error instanceof TypeError ? error.message : error;
        // dispatch(failedLogin(errorMsg));
        console.log(
          '%c deleteFavoriteCampground2 ERR RESP: ',
          'color: navy',
          error,
          errorMsg
        );
      });
  };
};
