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
      console.log(
        this.props.campgroundsData.allCampgrounds[0].FacilityDescription
      );
      return (
        <Fragment>
          <Card.Group>
            {this.props.campgroundsData.allCampgrounds.map(campground => (
              <Card
                key={campground.FacilityID}
                onClick={() => this.props.getCampground(campground)}
              >
                <Card.Content header={campground.FacilityName} />
                {/* <Card.Content
                    Style='word-wrap: break-word;'
                    description={
                      // campground.FacilityDescription.substring(0, 100) + '...'
                      `${campground.FacilityDescription.substring(0, 100)}...`
                    }
                  /> */}
                <Card.Content>
                  {/* fix(card): word-wrap overflowing card container with long
                    strings */}
                  <div className='description' Style='word-wrap: break-word;'>
                    <Card.Description>
                      <div> {campground.FacilityDescription}</div>
                    </Card.Description>
                  </div>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='user' />4 Friends
                </Card.Content>
              </Card>
            ))}
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
