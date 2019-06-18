import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signupUser, failedLogin } from '../../actions/userActions';
import { Form, Segment, Message } from 'semantic-ui-react';

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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    bio: '',
    avatar: '',
    usernameError: false,
    passwordError: false,
    confirmPasswordError: false
  };

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleChange = (e, semanticInputData) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignupSubmit = e => {
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
      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        bio: this.state.bio,
        avatar: this.state.avatar
      };

      this.props.signupUser(user); //comes from mapDispatchToProps
      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        bio: '',
        avatar: '',
        usernameError: false,
        passwordError: false,
        confirmPasswordError: false
      }); //reset form to initial state
    }
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

    console.log(
      '%c SIGNUP FORM PROPS: ',
      'color: purple',
      this.props,
      propsError
    );

    return this.props.loggedIn ? (
      <Redirect to='/profile' />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleSignupSubmit}
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
              placeholder='Username'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              error={this.state.usernameError}
            />
            <Form.Input
              required
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
              required
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
              required
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
              required
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
          <Form.Button>Signup</Form.Button>

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
//     loginFailed: reduxStoreState.usersReducer.loginFailed,
//     error: reduxStoreState.usersReducer.error,
//     loggedIn: reduxStoreState.usersReducer.loggedIn
//   }
// }

const mapStateToProps = ({
  user: { authenticatingUser, loginFailed, error, loggedIn }
}) => ({
  authenticatingUser,
  loginFailed,
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
export default connect(
  mapStateToProps,
  { signupUser, failedLogin } // comes from user actions
)(SignupForm);
