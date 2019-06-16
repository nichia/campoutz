import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCampground } from '../actions/campgroundActions';
import { bindActionCreators } from 'redux';
import LoadSpinner from '../components/LoadSpinner';
import CampgroundsList from '../components/CampgroundsList';
import CampgroundsPagination from '../components/CampgroundsPagination';

class CampgroundsContainer extends Component {
  render() {
    console.log('%c CampgroundsContainer ', 'color: green', this.props);

    return (
      <Fragment>
        {this.props.loading ? (
          <LoadSpinner>{this.props.loading}</LoadSpinner>
        ) : this.props.campgroundsData.allCampgrounds.length > 0 ? (
          <Fragment>
            <CampgroundsList
              campgrounds={this.props.campgroundsData}
              loggedIn={this.props.user.loggedIn}
              favorite_campgrounds={
                this.props.user.currentUser.favorite_campgrounds
              }
              getCampground={this.props.getCampground}
            />
            <CampgroundsPagination
              activePage={this.props.activePage}
              handlePaginationChange={this.props.handlePaginationChange}
            />
          </Fragment>
        ) : (
          <div>
            <h3>Search Results</h3>
            <h3>No matching results found. Enter a new search above.</h3>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.campgrounds.loading,
    campgroundsData: state.campgrounds.campgroundsData,
    user: state.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampground
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampgroundsContainer)
);
