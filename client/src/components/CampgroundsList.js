import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCampground } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';
import { Card, Icon } from 'semantic-ui-react';

class CampgroundsList extends Component {
  render() {
    console.log('%c campgroundsList ', 'color: green', this.props);
    if (this.props.campgroundsData.allCampgrounds.length > 0) {
      return (
        <Fragment>
          <Card.Group>
            {this.props.campgroundsData.allCampgrounds.map(
              (campground, index) => (
                <Card key={campground.FacilityID}>
                  <Card.Content header={campground.FacilityName} />
                  <Card.Content
                    description={
                      campground.FacilityDescription.substring(0, 100) + '...'
                    }
                  />
                  <Card.Content extra>
                    <Icon name='user' />4 Friends
                  </Card.Content>
                </Card>
              )
            )}
            ;
          </Card.Group>
        </Fragment>
      );
    } else {
      return <div>No Campgrounds Listing. Enter another search</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    campgroundsData: state.campgrounds.campgroundsData,
    currentCampground: state.campgrounds.currentCampground,
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampgroundsList)
);
