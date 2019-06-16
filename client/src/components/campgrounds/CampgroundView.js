import React, { Fragment } from 'react';
import LoadSpinner from '../LoadSpinner';
import CampgroundDetail from './CampgroundDetail';
// import CampgroundSites from './CampgroundSites';

const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const CampgroundView = props => {
  console.log('%c CampgroundView: ', 'color: orange', props);

  return (
    <div>
      {props.loading || isEmpty(props.campground) ? (
        <LoadSpinner>{props.loading}</LoadSpinner>
      ) : (
        <Fragment>
          <CampgroundDetail
            campground={props.campground}
            user={props.user}
            addFavoriteCampground={props.addFavoriteCampground}
            deleteFavoriteCampground={props.deleteFavoriteCampground}
          />
          {/* <CampgroundSites campgroundID={props.campground.FacilityID} /> */}
        </Fragment>
      )}
    </div>
  );
};

export default CampgroundView;
