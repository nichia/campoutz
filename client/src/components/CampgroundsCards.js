import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

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
    indexStart = description.indexOf('</h2>');
    if (indexStart !== '-1') {
      indexEnd = description.indexOf('<h2>', indexStart + 1);
      if (indexEnd > indexStart) {
        extractedDescription = description.substring(indexStart + 5, indexEnd);
      }
    }
  }
  return extractedDescription;
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
            {/* fix(card): word-wrap overflowing card container with long
                    strings */}
            {/* <div
              className='description'
              Style='width: 200px; white-space: nowrape; overflow: hidden; text-overflow: ellipsis;'
            > */}
            {/* <div className='description' Style='word-wrap: break-word;'> */}
            {/* <Card.Description Style='width: 200px; white-space: nowrape; overflow: hidden; text-overflow: ellipsis;'> */}
            <Card.Description>
              <div
                style={divStyle}
                dangerouslySetInnerHTML={{
                  __html: extractDescription(campground.FacilityDescription)
                }}
              />
              {/* // campground.FacilityDescription.substring(0, 100) + '...' // */}
              {/* `${campground.FacilityDescription.substring(0, 100)}...` */}
            </Card.Description>
            {/* </div> */}
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
