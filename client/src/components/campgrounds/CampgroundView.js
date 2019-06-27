import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import LoadSpinner from "../LoadSpinner";
import CampgroundDetail from "./CampgroundDetail";
import { Container, Header, Icon, Button } from "semantic-ui-react";

const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const CampgroundView = props => {
  const isLoading = props.loading || isEmpty(props.campground);
  const noCampgroundFound = props.campground.FacilityID === "";

  return (
    <div>
      {(isLoading && <LoadSpinner>{props.loading}</LoadSpinner>) ||
        (noCampgroundFound && (
          <Container>
            <br />
            <Header as="h3" icon textAlign="center">
              <Icon name="question" />
            </Header>
            <Header as="h3" icon textAlign="center">
              This campground could not be found
            </Header>
            <Header as="h2" icon textAlign="center">
              <Button color="blue" onClick={() => props.history.push("/")}>
                Go Home
              </Button>
            </Header>
          </Container>
        )) || (
          <Fragment>
            <CampgroundDetail
              campground={props.campground}
              user={props.user}
              addFavoriteCampground={props.addFavoriteCampground}
              deleteFavoriteCampground={props.deleteFavoriteCampground}
            />
          </Fragment>
        )}
    </div>
  );
};

export default withRouter(CampgroundView);
