import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      console.log('Set_current_user: %s', state.user);

      //action.payload { username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url' }
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        authenticatingUser: false
      };
    case actionTypes.AUTHENTICATING_USER: //tells the app we're fetching
      console.log('Authenticating_user: %s', state.user);

      return { ...state, authenticatingUser: true };
    case actionTypes.AUTHENTICATED_USER:
      console.log('Authenticated_user: %s', state.user);

      return { ...state, authenticatingUser: false };
    case actionTypes.FAILED_LOGIN: //for error handling
      console.log('Failed_login: %s', state.user);

      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      };
    case actionTypes.LOGOUT:
      // localStorage.setItem('jwt', JSONResponse.jwt);
      console.log('%c INSIDE LOGOUT REDUCER', 'color: pink');
      localStorage.removeItem('jwt');
      return { ...state, initialState };
    default:
      console.log('Initial user: %s', state.user);
      return state;
  }
};

export default usersReducer;
