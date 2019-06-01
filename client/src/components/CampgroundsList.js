import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Card, Icon, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

class CampgroundsList extends Component {
  render() {
    console.log('%c campgroundsList ', 'color: green', this.props);
    return (
      <Fragment>
        {this.props.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment>
        ) : null}

        {this.props.campgroundsData.allCampgrounds.length > 0 ? (
          <Card.Group loading={this.props.loading}>
            {this.props.campgroundsData.allCampgrounds.map(campground => (
              <Card key={campground.FacilityID}>
                <NavLink to={`/campgrounds/${campground.FacilityID}`} exact>
                  <Card.Content header={campground.FacilityName} />
                </NavLink>
                <Card.Content>
                  {/* fix(card): word-wrap overflowing card container with long
                    strings */}
                  <div className='description' Style='word-wrap: break-word;'>
                    <Card.Description>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: campground.FacilityDescription
                        }}
                      />
                    </Card.Description>
                  </div>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='user' />4 Friends
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        ) : (
          <div>No Campgrounds Listing. Select another search</div>
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

export default withRouter(connect(mapStateToProps)(CampgroundsList));
