import React from 'react';
import CampgroundsCard from './CampgroundsCard';
import { Card } from 'semantic-ui-react';

const CampgroundsList = ({ campgrounds, getCampground }) => {
  console.log('%c CampgroundsList', 'color: green', campgrounds);
  return (
    <Card.Group>
      {campgrounds.allCampgrounds.map(campground => (
        <CampgroundsCard
          campground={campground}
          getCampground={getCampground}
          key={campground.FacilityID}
        />
      ))}
    </Card.Group>
  );
};

export default CampgroundsList;
