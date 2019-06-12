import React from 'react';

import { Header, Container, List, Icon, Grid, Image } from 'semantic-ui-react';

const titleCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};

const saveCampground = (campground, user, addCampgroundToUserList) => {
  if (user.loggedIn) {
    return (
      <Icon
        name='heart outline'
        // name='heart'
        // color='red'
        onClick={() => addCampgroundToUserList(campground, user.currentUser)}
      />
    );
  } else {
    return null;
  }
};

const listRecAreas = recAreas => {
  return (
    <Header.Subheader>
      {'Part of '}
      <List bulleted horizontal>
        {recAreas.map(recArea => (
          <List.Item as='a' key={recArea.RecAreaID}>
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
      <Header as='h1'>Activities</Header>
      <div className='ui divider' />
      <List bulleted horizontal>
        {activities.map(activity => (
          <List.Item as='a' key={activity.ActivityID}>
            {titleCase(activity.ActivityName)}
          </List.Item>
        ))}
      </List>
      <div className='ui divider' />
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
      <Header as='h1'>Directions</Header>
      <div className='ui divider' />
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: directions
          }}
        />
        <Header as='h3'>GPS Coordinates:</Header>
        <Container>{gpsCoordinates}</Container>
      </Container>
      <div className='ui divider' />
    </Container>
  );
};

const listMediaGallery = medias => {
  return (
    <Container>
      <Header as='h1'>Media Gallery</Header>
      <div className='ui divider' />
      <Grid container columns={3}>
        {medias.map(media => (
          <Grid.Column key={media.EntityMediaID}>
            <Image src={media.URL} />
          </Grid.Column>
        ))}
      </Grid>
      <div className='ui divider' />
    </Container>
  );
};

const listOtherLinks = links => {
  return (
    <Container>
      <Header as='h1'>Additional Information</Header>
      <div className='ui divider' />
      <List>
        {links.map(link => (
          <List.Item key={link.EntityLinkID}>
            <Icon name='linkify' />{' '}
            <List.Content>
              {<a href={link.URL}>{link.Title}</a>} {link.LinkType}{' '}
              {link.Description}
            </List.Content>
          </List.Item>
        ))}
      </List>
      <div className='ui divider' />
    </Container>
  );
};

const CampgroundDetail = props => {
  const { campground, user, addCampgroundToUserList } = props;
  let activities;
  let recAreas;
  let directions;

  let mediaGallery;
  let otherLinks;

  console.log(
    '%c CampgroundDetail: ',
    'color: orange',
    props,
    ' user: ',
    user,
    ' campground: ',
    campground
  );

  const title = titleCase(campground.FacilityName);
  const saveButton = saveCampground(campground, user, addCampgroundToUserList);

  if (campground.ACTIVITY.length > 0) {
    activities = listActivities(campground.ACTIVITY);
  }
  if (campground.MEDIA.length > 0) {
    mediaGallery = listMediaGallery(campground.MEDIA);
  }
  if (campground.RECAREA.length > 0) {
    recAreas = listRecAreas(campground.RECAREA);
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
      {/* <Header as='h1'>{titleCase(`${campground.FacilityName}`)}</Header>
      <Header as='h1'>{titleCase(campground.FacilityName)}</Header> */}
      {/* {campground.FacilityDirections} */}
      {/* <Container>{listActivities(campground.ACTIVITY)}</Container> */}
      <Container>
        <div>
          <Header as='h1' floated='right'>
            {saveButton}
          </Header>
          <Header as='h1'>
            <Header.Content>
              {title}
              {recAreas}
            </Header.Content>
          </Header>
          <div className='ui divider' />
        </div>

        <Container>
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: campground.FacilityDescription
            }}
          />
          <br />
          <div className='ui divider' />
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
