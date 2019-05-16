import React, { Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NoMatch from './components/noMatch';
import Profile from './components/profile';

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/profile' />} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/signup' component={SignupForm} />
        <Route component={NoMatch} />
      </Switch>

      {/* <div className='App'>App Container</div>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div> */}
    </Fragment>
  );
}

export default withRouter(App); //withRouter is a Higher Order Component (HOC) that returns a COPY of App with React router props injected
