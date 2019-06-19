import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';

// props: { currentUser: { avatar: 'url', username: 'Chandler Bing', bio: 'bio' } }
// const Profile = ({ avatar, username, bio }) => (
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
  console.log('%c PROFILE', 'color: green', props);
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
          <Icon name='heart' color='red' />
          {favoritesCount} favorites
        </NavLink>
      </Card.Content>
    </Card>
  );
};

// const mapStateToProps = (reduxStoreState) => {
//   return {
//     avatar: reduxStoreState.usersReducer.user.avatar,
//     username: reduxStoreState.usersReducer.user.username,
//     bio: reduxStoreState.usersReducer.user.bio
//   }
// }

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

// const connectedToReduxHOC = connect(mapStateToProps)
// const connectedProfile = connectedToReduxHOC(Profile)
//
// const withAuthProfile = withAuth(connectedProfile)
//
// export default withAuthProfile

// to gain access to redux store
export default withAuth(connect(mapStateToProps)(Profile));
