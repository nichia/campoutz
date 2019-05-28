import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NoMatch from './components/noMatch';
import Profile from './components/profile';
import HomePage from './components/HomePage';
import { fetchCurrentUser } from './actions/user';

import './App.css';

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('jwt') && !this.props.loggedIn) {
      console.log('%c componentDidMount: ', 'color: pink');

      this.props.fetchCurrentUser();
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          {/* <Route exact path="/" render={() => <Redirect to="/profile" />} /> */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' component={SignupForm} />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()) //dispatch is automagically provided by redux
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
); //withRouter is a Higher Order Component (HOC) that returns a COPY of App with React router props injected
