import React from "react";
import * as format from "./TextFormating";

import { Header, Container, List, Icon, Grid, Image } from "semantic-ui-react";

const heartCampground = (
  campground,
  loggedIn,
  favoriteCampgrounds,
  addFavoriteCampground,
  deleteFavoriteCampground
) => {
  if (loggedIn) {
    // check if campground is alreaded hearted by current_user
    const isHearted = favoriteCampgrounds.some(
      favCamp => favCamp.FacilityID === campground.FacilityID
    );

    let heartIcon = (
      <Icon
        name="heart outline"
        onClick={() => addFavoriteCampground(campground)}
      />
    );
    if (isHearted) {
      heartIcon = (
        <Icon
          name="heart"
          color="red"
          onClick={() => deleteFavoriteCampground(campground.FacilityID)}
        />
      );
    }
    return heartIcon;
  } else {
    return null;
  }
};

const listRecAreas = (type, recAreas, organization) => {
  return (
    <Header.Subheader>
      {"Part of "}
      <List bulleted horizontal>
        {recAreas.map(recArea => (
          <List.Item as="a" key={recArea.RecAreaID}>
            <List.Content>{recArea.RecAreaName}</List.Content>
          </List.Item>
        ))}
      </List>
    </Header.Subheader>
  );
};

const listActivities = activities => {
  return (
    <Container>
      <Header as="h1">Activities</Header>
      <div className="ui divider" />
      <List bulleted horizontal>
        {activities.map(activity => (
          <List.Item key={activity.ActivityID}>
            {format.titleCase(activity.ActivityName)}
          </List.Item>
        ))}
      </List>
      <div className="ui divider" />
    </Container>
  );
};

const listgpsCoordinates = (latitude, longitude) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <p>Latitude:</p>
        <p>{latitude}</p>
      </Grid.Column>
      <Grid.Column>
        <p>Longitude:</p>
        <p>{longitude}</p>
      </Grid.Column>
    </Grid>
  );
};

const listDirections = (directions, latitude, longitude) => {
  let gpsCoordinates;
  gpsCoordinates = listgpsCoordinates(latitude, longitude);
  return (
    <Container>
      <Header as="h1">Directions</Header>
      <div className="ui divider" />
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: directions
          }}
        />
        <Header as="h3">GPS Coordinates:</Header>
        <Container>{gpsCoordinates}</Container>
      </Container>
      <div className="ui divider" />
    </Container>
  );
};

const listMediaGallery = medias => {
  return (
    <Container>
      <Header as="h1">Media Gallery</Header>
      <div className="ui divider" />
      <Grid container columns={3}>
        {medias.map(media => (
          <Grid.Column key={media.EntityMediaID}>
            <Image src={media.URL} />
          </Grid.Column>
        ))}
      </Grid>
      <div className="ui divider" />
    </Container>
  );
};

const listOtherLinks = links => {
  return (
    <Container>
      <Header as="h1">Additional Information</Header>
      <div className="ui divider" />
      <List>
        {links.map(link => (
          <List.Item key={link.EntityLinkID}>
            <Icon name="linkify" />{" "}
            <List.Content>{<a href={link.URL}>{link.Title}</a>}</List.Content>
          </List.Item>
        ))}
      </List>
      <div className="ui divider" />
    </Container>
  );
};

const CampgroundDetail = props => {
  const {
    campground,
    user: {
      loggedIn,
      currentUser: { favorite_campgrounds }
    },
    addFavoriteCampground,
    deleteFavoriteCampground
  } = props;

  const title = format.titleCase(campground.FacilityName);
  const heartIcon = heartCampground(
    campground,
    loggedIn,
    favorite_campgrounds,
    addFavoriteCampground,
    deleteFavoriteCampground
  );
  let activities;
  let recAreas;
  let directions;
  let mediaGallery;
  let otherLinks;

  if (campground.ACTIVITY.length > 0) {
    activities = listActivities(campground.ACTIVITY);
  }
  if (campground.MEDIA.length > 0) {
    mediaGallery = listMediaGallery(campground.MEDIA);
  }
  if (campground.RECAREA.length > 0) {
    recAreas = listRecAreas(
      campground.FacilityTypeDescription,
      campground.RECAREA,
      campground.ORGANIZATION
    );
  }
  if (campground.LINK.length > 0) {
    otherLinks = listOtherLinks(campground.LINK);
  }

  if (
    campground.FacilityDirections ||
    campground.FacilityLatitude > 0 ||
    campground.FacilityLongitude > 0
  ) {
    directions = listDirections(
      campground.FacilityDirections,
      campground.FacilityLatitude,
      campground.FacilityLongitude
    );
  }

  return (
    <div>
      <Container>
        <div>
          <Header as="h1" floated="right">
            {heartIcon}
          </Header>
          <Header as="h1">
            <Header.Content>
              {title}
              {recAreas}
            </Header.Content>
          </Header>
          <div className="ui divider" />
        </div>
        <Container>
          {campground.FacilityTypeDescription} {" of "}
          <List bulleted horizontal>
            {campground.ORGANIZATION.map(org => (
              <List.Item key={org.OrgID}>
                <List.Content>
                  {<a href={org.OrgURLAddress}>{org.OrgName}</a>}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Container>
        <Container>
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: campground.FacilityDescription
            }}
          />
          <br />
          <div className="ui divider" />
        </Container>
        {activities}
        {directions}
        {mediaGallery}
        {otherLinks}
      </Container>
    </div>
  );
};

export default CampgroundDetail;
