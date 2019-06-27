import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCampground } from "../actions/campgroundActions";
import { bindActionCreators } from "redux";
import CampgroundsList from "../components/campgrounds/CampgroundsList";

const FavoritesContainer = props => {
  if (props.loggedIn) {
    if (props.currentUser.favorite_campgrounds.length > 0) {
      return (
        <div>
          <CampgroundsList
            campgrounds={props.currentUser.favorite_campgrounds}
            loggedIn={props.loggedIn}
            favorite_campgrounds={props.currentUser.favorite_campgrounds}
            getCampground={props.getCampground}
          />
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <p>You do not have any saved favorites yet.</p>
        </div>
      );
    }
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampground
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);
