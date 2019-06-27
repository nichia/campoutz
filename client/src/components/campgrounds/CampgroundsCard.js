import React from "react";
import * as format from "./TextFormating";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Card, Icon, Button } from "semantic-ui-react";

/* fix(card): word-wrap overflowing card container with longstrings */
const divStyle = {
  wordWrap: "break-word"
};

const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
};

const extractDescription = description => {
  let extractedDescription = description;
  let indexStart = description.indexOf("<p>");
  let indexEnd = description.indexOf("</p>");
  let indexEnd2;
  if (indexEnd > indexStart) {
    extractedDescription = description.substring(indexStart + 3, indexEnd);
  } else {
    indexStart = description.indexOf("\n");
    if (indexStart !== "-1") {
      indexEnd = description.indexOf("\n", indexStart + 1);
      indexEnd2 = description.indexOf("<h2>", indexStart + 1);
      // For cases where the \n is not available before the next <h2> heading
      if (indexEnd2 !== "-1" && indexEnd2 < indexEnd) {
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

const heartCampground = (campground, loggedIn, favoriteCampgrounds) => {
  if (loggedIn) {
    const isHearted = favoriteCampgrounds.some(
      favCamp => favCamp.FacilityID === campground.FacilityID
    );

    let heartIcon = <Icon name="heart outline" />;
    if (isHearted) {
      heartIcon = <Icon name="heart" color="red" />;
    }
    return heartIcon;
  } else {
    return null;
  }
};

const CampgroundsCard = ({
  campground,
  loggedIn,
  favorite_campgrounds,
  getCampground,
  location: { pathname }
}) => {
  const heartIcon = heartCampground(campground, loggedIn, favorite_campgrounds);

  const handleItemClick = () => {
    if (pathname !== "/favorites") {
      // get currentCamground using campgroundsCard data so we
      // don't need to do another fetch api to get the currentCampground.
      // But for favorite campgrounds, we only have a subset of the
      // fields, so we don't want to get currentCampground, instead let
      // CampgroundContainer do the fetch api of currentCampground
      getCampground(campground);
    }
  };

  return (
    <Card>
      <Card.Content>
        <NavLink
          to={`/campgrounds/${campground.FacilityID}`}
          exact
          onClick={handleItemClick}
        >
          <div className="ui right floated">{heartIcon}</div>
          <Card.Header>{format.titleCase(campground.FacilityName)}</Card.Header>
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
          <div className="ui right floated">
            <Button primary onClick={handleItemClick}>
              <Icon name="eye" />
              View Details
            </Button>
          </div>
        </NavLink>
      </Card.Content>
    </Card>
  );
};

export default withRouter(CampgroundsCard);
