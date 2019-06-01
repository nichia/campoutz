import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const CampgroundView = props => {
  console.log('%c CampgroundView: ', 'color: brown', props);

  return (
    <div>
      {props.loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
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
    loading: state.campgrounds.campLoading,
    campground: state.campgrounds.currentCampground
  };
};

export default withRouter(connect(mapStateToProps)(CampgroundView));
