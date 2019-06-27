import * as actionTypes from "./actionTypes";

const BASE_URL = `/api/v1`;

// action creators //

const setCurrentUser = useroptions => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: useroptions
});

export const failedLogin = errorMsg => {
  return { type: actionTypes.FAILED_LOGIN, payload: errorMsg };
};

export const resetLoginError = () => {
  return { type: actionTypes.RESET_LOGIN_ERROR };
};

// tell our app we're currently fetching
const authenticatingUser = () => {
  return { type: actionTypes.AUTHENTICATING_USER };
};

export const logoutUser = () => {
  localStorage.removeItem("jwt");
  return { type: actionTypes.LOGOUT };
};

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

export const signupUser = props => {
  const { username, email, password, firstname, lastname, bio, avatar } = props;

  const url = `${BASE_URL}/users`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
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

  return dispatch => {
    fetch(url, options)
      .then(response => response.json())
      .then(JSONResponse => {
        if (JSONResponse.jwt) {
          localStorage.setItem("jwt", JSONResponse.jwt);
          dispatch(setCurrentUser(JSONResponse.user));
        } else {
          throw JSONResponse.error;
        }
      })
      .catch(error => {
        // TypeError is returned by api endpoint which contains error.message
        // (such as 'Failed to fetch' when server is not running)
        const errorMsg = error instanceof TypeError ? error.message : error;
        dispatch(failedLogin(errorMsg));
      });
  };
};

export const loginUser = props => {
  const { username, password } = props;

  const url = `${BASE_URL}/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  };

  return dispatch => {
    dispatch(authenticatingUser());

    fetch(url, options)
      .then(response => response.json())
      .then(JSONResponse => {
        if (JSONResponse.jwt) {
          localStorage.setItem("jwt", JSONResponse.jwt);
          dispatch(setCurrentUser(JSONResponse.user));
        } else {
          throw JSONResponse.error;
        }
      })
      .catch(error => {
        // TypeError is returned by api endpoint which contains error.message
        // (such as 'Failed to fetch' when server is not running)
        const errorMsg = error instanceof TypeError ? error.message : error;
        dispatch(failedLogin(errorMsg));
      });
  };
};

export const fetchCurrentUser = () => {
  const url = `${BASE_URL}/profile`;

  // takes the token in localStorage and finds out who it belongs to
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  };

  return dispatch => {
    dispatch(authenticatingUser()); //tells the app we are fetching
    fetch(url, options)
      // fetch() won't reject HTTP error status such as 404 or 500,
      // Instead, resolve normally (with ok status set to false) => so reason for logic below
      // (only reject on network failure or anything prevenint the request from completing).
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response received (not ok): ", response);
        }
      })
      .then(JSONResponse => {
        dispatch(setCurrentUser(JSONResponse.user));
      })
      .catch(error => {
        // TypeError is returned by api endpoint which contains error.message
        // (such as 'Failed to fetch' when server is not running)
        const errorMsg = error instanceof TypeError ? error.message : error;
        dispatch(failedLogin(errorMsg));
      });
  };
};

export const addFavoriteCampground = props => {
  const { FacilityID, FacilityName, FacilityDescription } = props;
  const url = `${BASE_URL}/favorite_campgrounds`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify({
      campground: {
        FacilityID: FacilityID,
        FacilityName: FacilityName,
        FacilityDescription: FacilityDescription
      }
    })
  };
  return dispatch => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response received (not ok): ", response);
        }
      })
      .then(JSONResponse => {
        dispatch(add_to_favorites(JSONResponse.campground));
      })
      .catch(error => {
        // TypeError is returned by api endpoint which contains error.message
        // (such as 'Failed to fetch' when server is not running)
        const errorMsg = error instanceof TypeError ? error.message : error;
        // dispatch(failedLogin(errorMsg));
        console.log(
          "%c addFavoriteCampground ERR RESP: ",
          "color: navy",
          error,
          errorMsg
        );
      });
  };
};

export const deleteFavoriteCampground = FacilityID => {
  const url = `${BASE_URL}/favorite_campgrounds/${FacilityID}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  };
  return dispatch => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response received (not ok): ", response);
        }
      })
      .then(JSONResponse => {
        dispatch(delete_from_favorites(JSONResponse.FacilityID));
      })
      .catch(error => {
        // TypeError is returned by api endpoint which contains error.message
        // (such as 'Failed to fetch' when server is not running)
        const errorMsg = error instanceof TypeError ? error.message : error;
        console.log(
          "%c deleteFavoriteCampground2 ERR RESP: ",
          "color: navy",
          error,
          errorMsg
        );
      });
  };
};
