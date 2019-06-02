import React, { Component, Fragment } from 'react';
import LoadSpinner from '../components/LoadSpinner';
import CampgroundsCards from '../components/CampgroundsCards';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CampgroundsContainer extends Component {
  render() {
    console.log('%c CampgroundsContainer ', 'color: green', this.props);
    return (
      <Fragment>
        {this.props.loading ? (
          <LoadSpinner>{this.props.loading}</LoadSpinner>
        ) : (
          <CampgroundsCards>{this.props.campgroundsData}</CampgroundsCards>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.campgrounds.loading,
    campgroundsData: state.campgrounds.campgroundsData
  };
};

export default withRouter(connect(mapStateToProps)(CampgroundsContainer));
