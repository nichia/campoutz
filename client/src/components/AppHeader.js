import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

const heading = pathname => {
  switch (pathname) {
    case '/profile':
      return (
        <Segment>
          <Header as='h1'>Profile</Header>
        </Segment>
      );
    case '/favorites':
      return (
        <Segment>
          <Header as='h1'>My Favorites</Header>
        </Segment>
      );
    case '/login':
      return (
        <Segment>
          <Header as='h1'>Login</Header>
        </Segment>
      );
    case '/signup':
      return (
        <Segment>
          <Header as='h1'>Signup</Header>
        </Segment>
      );
    default:
      return '';
  }
};

const AppHeader = ({ location: { pathname } }) => {
  console.log('%c AppHeader: ', 'color: brown', pathname, heading());

  return <div>{heading(pathname)}</div>;
};

export default withRouter(AppHeader);
