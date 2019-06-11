import React from 'react';
import LoadSpinner from './LoadSpinner';
import CampgroundDetail from './CampgroundDetail';

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
        <CampgroundDetail campground={props.campground} />

        // <div
        //   dangerouslySetInnerHTML={{
        //     __html: props.campground.FacilityDescription
        //   }}
        // />
      )}
    </div>
  );
};

export default CampgroundView;
