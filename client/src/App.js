import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from './actions/userActions';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NoMatch from './components/noMatch';
import Profile from './components/profile';
import HomePage from './containers/HomePage';
import Campground from './containers/CampgroundContainer';

import './App.css';

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('jwt') && !this.props.loggedIn) {
      console.log('%c APP componentDidMount: ', 'color: green');

      this.props.fetchCurrentUser();
    }
  }

  render() {
    console.log('%c APPs render: ', 'color: green');

    return (
      <Fragment>
        <Navbar />
        <Switch>
          {/* <Route exact path="/" render={() => <Redirect to="/profile" />} /> */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' component={SignupForm} />
          <Route exact path='/campgrounds/:id' component={Campground} />
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
