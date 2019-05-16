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
      console.log('%c Set_current_user: %s', 'color: red', state.user);

      //action.payload { username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url' }
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        authenticatingUser: false
      };
    case actionTypes.AUTHENTICATING_USER: //tells the app we're fetching
      console.log('%c Authenticating_user: %s', 'color: red', state.user);

      return { ...state, authenticatingUser: true };
    case actionTypes.AUTHENTICATED_USER:
      console.log('%c Authenticated_user: %s', 'color: red', state.user);

      return { ...state, authenticatingUser: false };
    case actionTypes.FAILED_LOGIN: //for error handling
      console.log('%c Failed_login: %s', 'color: red', state.user);

      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      };
    case actionTypes.LOGOUT:
      console.log('%c Logout: %s', 'color: red', state.user);

      return initialState;
    default:
      console.log('%c Initial user: %s', 'color: red', state.user);
      return state;
  }
};

export default usersReducer;
