import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const CampgroundsView = ({ children }) => {
  console.log('%c CampgroundsView ', 'color: green', children);

  return children.allCampgrounds.length > 0 ? (
    <Card.Group>
      {children.allCampgrounds.map(campground => (
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
  );
};

export default CampgroundsView;
