import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';

/* fix(card): word-wrap overflowing card container with longstrings */
const divStyle = {
  wordWrap: 'break-word'
};

const extractDescription = description => {
  let extractedDescription = description;
  let indexStart = description.indexOf('<p>');
  let indexEnd = description.indexOf('</p>');
  if (indexEnd > indexStart) {
    extractedDescription = description.substring(indexStart + 3, indexEnd);
  } else {
    indexStart = description.indexOf('\n');
    if (indexStart !== '-1') {
      indexEnd = description.indexOf('\n', indexStart + 1);
      if (indexEnd > indexStart) {
        extractedDescription = description.substring(indexStart + 1, indexEnd);
      }
    }
  }
  return extractedDescription + '...';
};

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
            <Card.Description>
              <div
                style={divStyle}
                dangerouslySetInnerHTML={{
                  __html: extractDescription(campground.FacilityDescription)
                }}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <NavLink to={`/campgrounds/${campground.FacilityID}`} exact>
              <div className='ui right floated'>
                <Button primary>
                  <Icon name='eye' />
                  View Details
                </Button>
              </div>
            </NavLink>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  ) : (
    <div>No Campgrounds Listing. Select another search</div>
  );
};

export default CampgroundsView;
