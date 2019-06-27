import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { fetchCurrentUser } from "../actions/userActions";
import { Loader } from "semantic-ui-react";

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends Component {
    componentDidMount() {
      // if i have a token but don't know who it belongs to, ask the server for that user's data
      if (localStorage.getItem("jwt") && !this.props.loggedIn)
        this.props.fetchCurrentUser();
    }

    render() {
      if (localStorage.getItem("jwt") && this.props.loggedIn) {
        //i have a token and i'm logged in
        // wrapped component in our case is Profile
        return <WrappedComponent />;
      } else if (
        localStorage.getItem("jwt") &&
        (this.props.authenticatingUser && !this.props.loggedIn)
      ) {
        //we're currently fetching, show a loading spinner
        return <Loader active inline="centered" />;
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to="/login" />;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.user.loggedIn,
      authenticatingUser: state.user.authenticatingUser
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser()) //dispatch is automagically provided by redux
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthorizedComponent);
};

export default withAuth;
