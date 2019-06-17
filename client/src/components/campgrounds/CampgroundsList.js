import React from 'react';
import CampgroundsCard from './CampgroundsCard';
import { Card } from 'semantic-ui-react';

const CampgroundsList = ({
  campgrounds,
  loggedIn,
  favorite_campgrounds,
  getCampground
}) => {
  console.log(
    '%c CampgroundsList',
    'color: green',
    campgrounds,
    loggedIn,
    favorite_campgrounds
  );
  return (
    <Card.Group>
      {campgrounds.map(campground => (
        <CampgroundsCard
          campground={campground}
          loggedIn={loggedIn}
          favorite_campgrounds={favorite_campgrounds}
          getCampground={getCampground}
          key={campground.FacilityID}
        />
      ))}
    </Card.Group>
  );
};

export default CampgroundsList;
