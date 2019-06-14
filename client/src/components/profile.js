import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';

// props: { currentUser: { avatar: 'url', username: 'Chandler Bing', bio: 'bio' } }
// const Profile = ({ avatar, username, bio }) => (
const Profile = ({ avatar, username, bio }) => {
  console.log('%c PROFILE', 'color: green');
  return (
    <Card>
      <Image src={avatar} />
      <Card.Content>
        <Card.Header>{username}</Card.Header>

        <Card.Description>{bio}</Card.Description>
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

const mapStateToProps = ({
  user: {
    currentUser: { avatar, username, bio }
  }
}) => ({
  avatar,
  username,
  bio
});

// const connectedToReduxHOC = connect(mapStateToProps)
// const connectedProfile = connectedToReduxHOC(Profile)
//
// const withAuthProfile = withAuth(connectedProfile)
//
// export default withAuthProfile

// to gain access to redux store
export default withAuth(connect(mapStateToProps)(Profile));
