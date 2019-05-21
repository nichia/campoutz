import * as actionTypes from './actionTypes';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/api/v1`;

// action creators //

export const setCurrentUser = userData => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: userData
});

export const failedLogin = errorMsg => ({
  type: actionTypes.FAILED_LOGIN,
  payload: errorMsg
});

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

// async action createors //

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

    const data = {
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

      fetch(`${baseUrl}/users`, data)
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
            dispatch(failedLogin(JSONResponse.error));
          }
        })
        .catch(err => {
          console.log('%c signUP ERR RESP: ', 'color: navy', err);
          dispatch(failedLogin(err.message));
          // dispatch({ type: actionTypes.FAILED_LOGIN, payload: err.message })
        });
    };
  };

export const /*FUNCTION*/ loginUser = props => {
    const { username, password } = props;
    const data = {
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
      fetch(`${baseUrl}/login`, data)
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
            dispatch(failedLogin(JSONResponse.error));
          }
        })
        .catch(err => {
          console.log('%c loginUser ERR RESP: ', 'color: navy', err);
          dispatch(failedLogin(err.message));
          // dispatch({ type: actionTypes.FAILED_LOGIN, payload: err.message })
        });
    };
  };

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  const data = {
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
    fetch(`${baseUrl}/profile`, data)
      .then(response => response.json())
      .then(JSONResponse => {
        console.log('%c fetCurrentUser: ', 'color: navy', JSONResponse.user);
        dispatch(setCurrentUser(JSONResponse.user));
      });
  };
};
