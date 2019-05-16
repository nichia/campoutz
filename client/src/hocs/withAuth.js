import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import * as actions from '../actions'
import { fetchCurrentUser } from '../actions/user';
import { Loader } from 'semantic-ui-react';

const withAuth = /*FUNCTION*/ WrappedComponent => {
  class AuthorizedComponent extends Component {
    componentDidMount() {
      console.log(
        '%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC',
        'color: purple'
      );
      // POTENTIAL SECURITY FLAW!!! my tokens don't expire
      if (localStorage.getItem('jwt') && !this.props.loggedIn)
        this.props.fetchCurrentUser();
      // if i have a token but don't know who it belongs to, ask the server for that user's data
    }

    render() {
      console.log('%c INSIDE RENDER FOR HOC', 'color: green');
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        //i have a token and i'm logged in
        // wrapped component in our case is Profile
        return <WrappedComponent />;
      } else if (
        localStorage.getItem('jwt') &&
        (this.props.authenticatingUser || !this.props.loggedIn)
      ) {
        //we're currently fetching, show a loading spinner
        return <Loader active inline='centered' />;
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to='/login' />;
      }
    }
  }

  const mapStateToProps = /*FUNCTION*/ reduxStoreState => {
    return {
      loggedIn: reduxStoreState.user.loggedIn,
      authenticatingUser: reduxStoreState.user.authenticatingUser
    };
  };

  const mapDispatchToProps = /*FUNCTION*/ dispatch => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser()) //dispatch is automagically provided by redux
    };
  };
  //
  // const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
  // const connectedAuthorizedComponent = connectedToReduxHOC(AuthorizedComponent)
  // return connectedAuthorizedComponent

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthorizedComponent);
};

export default withAuth;
