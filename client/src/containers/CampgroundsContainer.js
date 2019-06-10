import React, { Component, Fragment } from 'react';
import LoadSpinner from '../components/LoadSpinner';
import CampgroundsCards from '../components/CampgroundsCards';
import CampgroundsPagination from '../components/CampgroundsPagination';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CampgroundsContainer extends Component {
  render() {
    console.log('%c CampgroundsContainer ', 'color: green', this.props);

    return (
      <Fragment>
        {this.props.loading ? (
          <LoadSpinner>{this.props.loading}</LoadSpinner>
        ) : this.props.campgroundsData.allCampgrounds.length > 0 ? (
          <Fragment>
            <CampgroundsCards>{this.props.campgroundsData}</CampgroundsCards>
            <CampgroundsPagination
              searchQuery={this.props.searchQuery}
              activePage={this.props.activePage}
              handlePaginationChange={this.props.handlePaginationChange}
            />
          </Fragment>
        ) : (
          <div>
            <h3>Search Results</h3>
            <h3>No matching results found</h3>
          </div>
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
