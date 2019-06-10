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
  let indexEnd2;
  if (indexEnd > indexStart) {
    extractedDescription = description.substring(indexStart + 3, indexEnd);
  } else {
    indexStart = description.indexOf('\n');
    if (indexStart !== '-1') {
      indexEnd = description.indexOf('\n', indexStart + 1);
      indexEnd2 = description.indexOf('<h2>', indexStart + 1);
      // For cases where the \n is not available before the next <h2> heading
      if (indexEnd2 !== '-1' && indexEnd2 < indexEnd) {
        indexEnd = indexEnd2;
      }
      if (indexEnd > indexStart) {
        extractedDescription = description.substring(indexStart + 1, indexEnd);
      }
    }
  }
  return extractedDescription + '...';
};

const CampgroundsView = ({ children }) => {
  console.log('%c CampgroundsCards', 'color: green', children);

  return (
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
  );
};

export default CampgroundsView;
