import * as actionTypes from './actionTypes';

// async action createors

export const /*FUNCTION*/ signupUser = (username, email, password) => {
    return /*FUNCTION*/ dispatch => {
      //thunk
      console.log(
        '%c signupUser: ',
        'color: navy',
        process.env.REACT_APP_API_ENDPOINT
      );
      // })
      dispatch({ type: actionTypes.AUTHENTICATING_USER });
      // dispatch(authenticatingUser())
      // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`)
      // adapter.signupUser(username, password)
      // http://localhost:3000
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
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
            password: password
          }
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        /* { user:
          { username: 'chandler bing', bio: '', avatar: ''},
          jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
      } */
        .then(JSONResponse => {
          console.log('%c INSIDE YE OLDE .THEN', 'color: navy');
          localStorage.setItem('jwt', JSONResponse.jwt);
          dispatch({
            type: actionTypes.SET_CURRENT_USER,
            payload: JSONResponse.user
          });
          // dispatch(setCurrentUser(JSONResponse.user))
        })
        .catch(r =>
          r
            .json()
            .then(e =>
              dispatch({ type: actionTypes.FAILED_LOGIN, payload: e.message })
            )
        );
      // .then((jsonResponse) => {
      //   localStorage.setItem('jwt', jsonResponse.jwt)
      //   dispatch(setCurrentUser(jsonResponse.user))
      // })
    };
  };

export const /*FUNCTION*/ loginUser = (username, password) => {
    return /*FUNCTION*/ dispatch => {
      //thunk
      console.log(
        '%c loginUser: ',
        'color: navy',
        process.env.REACT_APP_API_ENDPOINT
      );
      dispatch({ type: actionTypes.AUTHENTICATING_USER });
      // dispatch(authenticatingUser())
      // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`)
      // adapter.loginUser(username, password)
      // http://localhost:3000
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
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
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        /* { user:
    { username: 'chandler bing', bio: '', avatar: ''},
    jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
  } */
        .then(JSONResponse => {
          console.log('%c INSIDE YE OLDE .THEN', 'color: navy');
          localStorage.setItem('jwt', JSONResponse.jwt);
          dispatch({
            type: actionTypes.SET_CURRENT_USER,
            payload: JSONResponse.user
          });
          // dispatch(setCurrentUser(JSONResponse.user))
        })
        .catch(r =>
          r
            .json()
            .then(e =>
              dispatch({ type: actionTypes.FAILED_LOGIN, payload: e.message })
            )
        );
      // .then((jsonResponse) => {
      //   localStorage.setItem('jwt', jsonResponse.jwt)
      //   dispatch(setCurrentUser(jsonResponse.user))
      // })
    };
  };

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return dispatch => {
    console.log(
      '%c fetchCurrentUser: ',
      'color: navy',
      process.env.REACT_APP_API_ENDPOINT
    );
    dispatch(authenticatingUser()); //tells the app we are fetching
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then(JSONResponse => dispatch(setCurrentUser(JSONResponse.user)));
  };
};

// action creators

export const setCurrentUser = userData => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: userData
});

export const failedLogin = errorMsg => ({
  type: actionTypes.FAILED_LOGIN,
  payload: errorMsg
});

// tell our app we're currently fetching
// export const authenticatingUser = () => ({
//   type: actionTypes.AUTHENTICATING_USER
// });
export const authenticatingUser = () => {
  console.log('%c INSIDE authenticatingUser action/user', 'color: navy');
  return { type: actionTypes.AUTHENTICATING_USER };
};

export const logoutUser = () => {
  console.log('%c INSIDE LOGOUT action/user', 'color: navy');
  localStorage.removeItem('jwt');
  return { type: actionTypes.LOGOUT };
};
