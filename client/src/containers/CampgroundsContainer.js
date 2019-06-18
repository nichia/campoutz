import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCampground } from '../actions/campgroundActions';
import { bindActionCreators } from 'redux';
import LoadSpinner from '../components/LoadSpinner';
import CampgroundsList from '../components/campgrounds/CampgroundsList';
import CampgroundsPagination from '../components/campgrounds/CampgroundsPagination';
import CampgroundsMap from './MapContainer';
import { Grid, Segment } from 'semantic-ui-react';

class CampgroundsContainer extends Component {
  render() {
    console.log('%c CampgroundsContainer ', 'color: green', this.props);

    return (
      <Fragment>
        {this.props.loading ? (
          <LoadSpinner>{this.props.loading}</LoadSpinner>
        ) : this.props.campgroundsData.allCampgrounds.length > 0 ? (
          <Fragment>
            <Segment>
              <Grid columns={2} divided>
                <Grid.Column>
                  <CampgroundsList
                    campgrounds={this.props.campgroundsData.allCampgrounds}
                    loggedIn={this.props.user.loggedIn}
                    favorite_campgrounds={
                      this.props.user.currentUser.favorite_campgrounds
                    }
                    getCampground={this.props.getCampground}
                  />
                </Grid.Column>
                <Grid.Column>
                  <CampgroundsMap />
                </Grid.Column>
              </Grid>
            </Segment>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampgroundsContainer);
