import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { signupUser, failedLogin } from '../actions/user';
import { Button, Form, Segment, Message } from 'semantic-ui-react';

class SignupForm extends Component {
  // constructor() {
  //   this.state = {
  //     username: '',
  //     password: '',
  //     email: '',
  //     firstname: '',
  //     lastname: '',
  //     bio: '',
  //     avatar: ''
  //   }
  // }
  state = {
    user: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      bio: '',
      avatar: ''
    },
    ErrorLog: {
      usernameError: false,
      passwordError: false,
      confirmPasswordError: false
    }
  };

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleChange = (e, semanticInputData) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    //semantic forms preventDefault for you
    // e.preventDefault()

    let errorMsg = [];

    if (this.state.username.length < 3) {
      this.setState({ usernameError: true });
      errorMsg.push('Username must be at least 3 characters');
    } else {
      this.setState({ usernameError: false });
    }

    if (this.state.password.length < 8) {
      this.setState({ passwordError: true });
      errorMsg.push('Password must be at least 8 characters');
    } else {
      this.setState({ passwordError: false });
    }

    if (this.state.confirmPassword !== this.state.password) {
      this.setState({ confirmPasswordError: true });
      errorMsg.push('The password provided does not match');
    } else {
      this.setState({ confirmPasswordError: false });
    }

    if (errorMsg.length !== 0) {
      this.props.failedLogin(errorMsg); //comes from mapDispatchToProps
    } else {
      this.props.signupUser(this.state.user); //comes from mapDispatchToProps
      this.setState({
        user: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          firstname: '',
          lastname: '',
          bio: '',
          avatar: ''
        },
        ErrorLog: {
          usernameError: false,
          passwordError: false,
          confirmPasswordError: false
        }
      }); //reset form to initial state
    }
  };

  render() {
    console.log('%c SIGNUP FORM PROPS: ', 'color: purple', this.props);
    return this.props.loggedIn ? (
      <Redirect to='/profile' />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size='mini'
          key='mini'
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          />
          <Form.Group widths='equal'>
            <Form.Input
              required='true'
              icon='user'
              iconPosition='left'
              label='Username:'
              placeholder='Username'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              error={this.state.usernameError}
            />
            <Form.Input
              required='true'
              icon='envelope'
              iconPosition='left'
              label='Email:'
              placeholder='Email'
              name='email'
              type='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              required='true'
              icon='lock'
              iconPosition='left'
              label='Password:'
              placeholder='Create a password'
              name='password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password}
              error={this.state.passwordError}
            />
            <Form.Input
              required='true'
              icon='lock'
              iconPosition='left'
              label='Confirm Password:'
              placeholder='Confirm password'
              name='confirmPassword'
              type='password'
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              error={this.state.confirmPasswordError}
            />
            <Form.Input
              label='Avatar:'
              required='true'
              // icon='linkify'
              icon='image'
              iconPosition='left'
              placeholder='Avatar url'
              name='avatar'
              type='url'
              onChange={this.handleChange}
              value={this.state.avatar}
            />
            <Form.Input
              label='First Name:'
              icon='user'
              iconPosition='left'
              placeholder='First name'
              name='firstname'
              onChange={this.handleChange}
              value={this.state.firstname}
            />
            <Form.Input
              label='Last Name:'
              icon='user'
              iconPosition='left'
              placeholder='Last name'
              name='lastname'
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <Form.TextArea
              label='About:'
              placeholder='Tell us more about you...'
              name='bio'
              onChange={this.handleChange}
              value={this.state.bio}
            />
          </Form.Group>
          <Button type='submit'>Signup</Button>
          <br />
          <NavLink to='/login'>Already a member? Log in</NavLink>
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

const mapStateToProps = ({
  user: { authenticatingUser, failedLogin, error, loggedIn }
}) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signupUser: (username, password) => dispatch(signupUser(username, password))
//   }
// }

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxSignupForm = connectedToReduxHOC(SignupForm)
// const connectedToReduxHOCWithRouterSignupForm = withRouter(connectedToReduxSignupForm)
//
// export default connectedToReduxHOCWithRouterSignupForm

// to gain access to redux store
export default withRouter(
  connect(
    mapStateToProps,
    { signupUser, failedLogin } // comes from user actions
  )(SignupForm)
);
