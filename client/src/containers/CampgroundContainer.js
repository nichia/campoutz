import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampground } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';
import CampgroundView from '../components/CampgroundView';

export class Campground extends Component {
  constructor(props) {
    super(props);
    this.campgroundID = props.match.params.id;
  }

  componentDidMount() {
    console.log(
      '%c CampgroundContainer componentDidMount: ',
      'color: orange',
      this.props
    );
    if (this.campgroundID !== this.props.campground.FacilityID) {
      // fetchCampground if currentCampground does not equal to requsted campgroundID
      this.props.fetchCampground(this.campgroundID);
    }
  }

  render() {
    console.log('%c CampgroundContainer render: ', 'color: orange', this.props);
    return (
      <div>
        <CampgroundView
          loading={this.props.loading}
          campground={this.props.campground}
          user={this.props.user}
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
      fetchCampground
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Campground)
);
