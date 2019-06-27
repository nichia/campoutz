import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import withAuth from "../hocs/withAuth";

const Profile = props => {
  const {
    currentUser: {
      avatar,
      username,
      firstname,
      lastname,
      bio,
      favorite_campgrounds
    }
  } = props;
  const favoritesCount = favorite_campgrounds.length;

  return (
    <Card>
      <Image src={avatar} />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>
          {firstname} {lastname}
        </Card.Meta>
        <Card.Description>{bio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <NavLink to={`/favorites`} exact>
          <Icon name="heart" color="red" />
          {favoritesCount} favorites
        </NavLink>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default withAuth(connect(mapStateToProps)(Profile));
