import React from 'react';
import LoadSpinner from './LoadSpinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CampgroundView = props => {
  console.log('%c CampgroundView: ', 'color: orange', props);

  return (
    <div>
      {props.loading ? (
        <LoadSpinner>{props.loading}</LoadSpinner>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: props.campground.FacilityDescription
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.campgrounds.loadingCampground,
    campground: state.campgrounds.currentCampground
  };
};

export default withRouter(connect(mapStateToProps)(CampgroundView));
