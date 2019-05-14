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
      //action.payload { username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url' }
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        authenticatingUser: false
      };
    case actionTypes.AUTHENTICATING_USER: //tells the app we're fetching
      return { ...state, authenticatingUser: true };
    case actionTypes.AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false };
    case actionTypes.FAILED_LOGIN: //for error handling
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      };
    case actionTypes.LOGOUT:
      return { ...state, initialState };
    default:
      return state;
  }
};

export default usersReducer;
