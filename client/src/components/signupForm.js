import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { signupUser } from '../actions/user';
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
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
    bio: '',
    avatar: ''
  };

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleChange = (e, semanticInputData) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    //semantic forms preventDefault for you
    // e.preventDefault()
    this.props.signupUser(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.passwordConfirm,
      this.state.firstname,
      this.state.lastname,
      this.state.bio,
      this.state.avatar
    ); //comes from mapDispatchToProps
    this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      firstname: '',
      lastname: '',
      bio: '',
      avatar: ''
    }); //reset form to initial state
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
              // label='username'
              placeholder='Username'
              name='username'
              type='minLength[3]'
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              required='true'
              icon='envelope'
              iconPosition='left'
              // label='Email'
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
              // label='password'
              placeholder='Create a password'
              name='password'
              type='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Form.Input
              required='true'
              icon='lock'
              iconPosition='left'
              // label='password confirmation'
              placeholder='Re-type password to confirm'
              name='passwordConfirm'
              type='match[password]'
              onChange={this.handleChange}
              value={this.state.passwordConfirm}
            />
            <Form.Input
              // label='avatar'
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
              // label='firstname'
              icon='user'
              iconPosition='left'
              placeholder='First name'
              name='firstname'
              onChange={this.handleChange}
              value={this.state.firstname}
            />
            <Form.Input
              // label='lastname'
              icon='user'
              iconPosition='left'
              placeholder='Last name'
              name='lastname'
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <Form.TextArea
              // label='bio'
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
    { signupUser } // comes from user actions
  )(SignupForm)
);
