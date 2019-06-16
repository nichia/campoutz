import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import { Button, Form, Segment, Message } from 'semantic-ui-react';

class LoginForm extends Component {
  // constructor() {
  //   this.state = { username: '', password: '' }
  // }
  state = { username: '', password: '' };

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleChange = (e, semanticInputData) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    //semantic forms preventDefault for you
    // e.preventDefault()
    this.props.loginUser(this.state); //comes from mapDispatchToProps
    this.setState({ username: '', password: '' }); //reset form to initial state
  };

  formatError = () => {
    // if this.props.error is null (not true), propsError = null
    // Else, if this.props.error is an array, join the error messages by 'unordered list'
    if (this.props.error) {
      if (Array.isArray(this.props.error)) {
        const listErrors = this.props.error.map((error, index) => (
          <li key={index}>{error}</li>
        ));
        return <ul>{listErrors}</ul>;
      } else {
        return this.props.error;
      }
    } else {
      return null;
    }
  };

  render() {
    const propsError = this.formatError;

    console.log('%c LOGIN FORM PROPS: ', 'color: purple', this.props);

    return this.props.loggedIn ? (
      <Redirect to='/' />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size='mini'
          key='mini'
          loading={this.props.authenticatingUser}
          error={this.props.loginFailed}
        >
          <Message error header={this.props.loginFailed ? propsError : null} />
          <Form.Group widths='equal'>
            <Form.Input
              required
              icon='user'
              iconPosition='left'
              label='Username:'
              placeholder='username'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              required
              icon='lock'
              iconPosition='left'
              label='Password:'
              placeholder='password'
              name='password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type='submit'>Login</Button>
          <br />
          <NavLink to='/signup'>Not on Campoutz yet? Sign up</NavLink>
        </Form>
      </Segment>
    );
  }
}

// const mapStateToProps = (reduxStoreState) => {
//   return {
//     authenticatingUser: reduxStoreState.usersReducer.authenticatingUser,
//     failedLogin: reduxStoreState.usersReducer.failedLogin,
//     error: reduxStoreState.usersReducer.error,
//     loggedIn: reduxStoreState.usersReducer.loggedIn
//   }
// }

// es6 shortcut: object destructuring - from redux store state, pull out user: object
// from this object, pull out authenticatingUser, loginFailed, error, loggedIn.
// arror function => without curly brackets, just wrapped in parentheses - implicit return
const mapStateToProps = ({
  user: { authenticatingUser, loginFailed, error, loggedIn }
}) => ({
  // es6 shortcut: keys and values match up as (authenticatingUser: authenticatingUser),
  // can condense as below
  authenticatingUser,
  loginFailed,
  error,
  loggedIn
});

const mapDispatchToProps = dispatch => ({
  // implicit return when wrapped in parentheses
  loginUser: (username, password) => dispatch(loginUser(username, password))
});

// arror function => with curly brackets, must have explicit 'return'
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (username, password) => dispatch(loginUser(username, password))
//   }
// }

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxLoginForm = connectedToReduxHOC(LoginForm)
// const connectedToReduxHOCWithRouterLoginForm = withRouter(connectedToReduxLoginForm)
//
// export default connectedToReduxHOCWithRouterLoginForm

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
    // { loginUser }  // implicit
  )(LoginForm)
);
