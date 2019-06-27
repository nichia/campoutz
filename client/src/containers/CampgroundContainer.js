import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampground } from "../actions/campgroundActions";
import {
  addFavoriteCampground,
  deleteFavoriteCampground
} from "../actions/userActions";
import { bindActionCreators } from "redux";
import CampgroundView from "../components/campgrounds/CampgroundView";

export class Campground extends Component {
  constructor(props) {
    super(props);
    this.campgroundID = props.match.params.id;
  }

  componentDidMount() {
    if (this.campgroundID !== this.props.campground.FacilityID) {
      // fetchCampground if currentCampground does not equal to requsted campgroundID
      this.props.fetchCampground(this.campgroundID);
    }
  }

  render() {
    return (
      <div>
        <CampgroundView
          loading={this.props.loading}
          campground={this.props.campground}
          user={this.props.user}
          addFavoriteCampground={this.props.addFavoriteCampground}
          deleteFavoriteCampground={this.props.deleteFavoriteCampground}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.campgrounds.loadingCampground,
    campground: state.campgrounds.currentCampground,
    user: state.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCampground,
      addFavoriteCampground,
      deleteFavoriteCampground
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campground);
