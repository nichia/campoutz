import React from 'react';
import { Header, Container, List, Grid, Image } from 'semantic-ui-react';

const titleCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};

const listActivities = activities => {
  return (
    <List bulleted horizontal>
      {activities.map(activity => (
        <List.Item as='a' key={activity.ActivityID}>
          {titleCase(activity.ActivityName)}
        </List.Item>
      ))}
    </List>
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

const listMediaGallery = medias => {
  return (
    <Grid container columns={3}>
      {medias.map(media => (
        <Grid.Column key={media.EntityMediaID}>
          <Image src={media.URL} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

const listRecAreas = recAreas => {
  return (
    <List bulleted horizontal>
      Part of
      {recAreas.map(recArea => (
        <List.Item as='a' key={recArea.RecAreaID}>
          <List.Content>{recArea.RecAreaName}</List.Content>
        </List.Item>
      ))}
    </List>
  );
};

const listOtherLinks = links => {
  return (
    <List>
      {links.map(link => (
        <List.Item
          key={link.EntityLinkID}
          icon='linkify'
          content={<a href={link.URL}>{link.Title}</a>}
        />
      ))}
    </List>
  );
};

const CampgroundDetail = props => {
  const { campground } = props;

  console.log('%c CampgroundDetail: ', 'color: orange', campground);

  const title = titleCase(`${campground.FacilityName}`);
  const activities = listActivities(campground.ACTIVITY);
  const mediaGallery = listMediaGallery(campground.MEDIA);
  const recAreas = listRecAreas(campground.RECAREA);
  const otherLinks = listOtherLinks(campground.LINK);
  const gpsCoordinates = listgpsCoordinates(
    campground.FacilityLatitude,
    campground.FacilityLongitude
  );

  return (
    <div>
      {/* <Header as='h1'>{titleCase(`${campground.FacilityName}`)}</Header>
      <Header as='h1'>{titleCase(campground.FacilityName)}</Header> */}
      {/* {campground.FacilityDirections} */}
      {/* <Container>{listActivities(campground.ACTIVITY)}</Container> */}
      <Container>
        <Header as='h1'>{title}</Header>
        <Container>Part of {recAreas}</Container>

        <Container>
          <div
            dangerouslySetInnerHTML={{
              __html: campground.FacilityDescription
            }}
          />
        </Container>

        <Header as='h1'>Activities</Header>
        <div className='ui divider' />
        <Container>{activities}</Container>
        <div className='ui divider' />

        <Header as='h1'>Directions</Header>
        <div className='ui divider' />
        <Container>
          <div
            dangerouslySetInnerHTML={{
              __html: campground.FacilityDirections
            }}
          />

          <Header as='h3'>GPS Coordinates:</Header>
          <Container>{gpsCoordinates}</Container>
        </Container>

        <Header as='h1'>Media Gallery</Header>
        <div className='ui divider' />
        <Container>{mediaGallery}</Container>

        <Header as='h1'>Additional Information</Header>
        <div className='ui divider' />
        <Container>{otherLinks}</Container>

        <div className='ui divider' />
      </Container>
    </div>
  );
};

export default CampgroundDetail;
