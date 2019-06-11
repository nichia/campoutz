import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';

/* fix(card): word-wrap overflowing card container with longstrings */
const divStyle = {
  wordWrap: 'break-word'
};

const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + '&hellip;'
  );
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

  if (!extractedDescription.match(/[0-9a-z]/i)) {
    // catches issues with empty string as some data have multiple of empty <p></p> tags
    extractedDescription = description;
  }

  return truncate(extractedDescription, 180, true);
};

const CampgroundsCard = ({ campground, getCampground }) => {
  console.log('%c CampgroundsCard', 'color: green', campground);

  return (
    <Card>
      <Card.Content>
        <NavLink
          to={`/campgrounds/${campground.FacilityID}`}
          exact
          onClick={() => getCampground(campground)}
        >
          <Card.Header>{campground.FacilityName}</Card.Header>
        </NavLink>
      </Card.Content>
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
            <Button primary onClick={() => getCampground(campground)}>
              <Icon name='eye' />
              View Details
            </Button>
          </div>
        </NavLink>
      </Card.Content>
    </Card>
  );
};

export default CampgroundsCard;
