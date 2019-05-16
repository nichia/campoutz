import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
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
  //     avatar: ''
  //   }
  // }
  state = {
    username: '',
    email: '',
    password: ''
    // firstname: '',
    // lastname: '',
    // avatar: ''
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
      this.state.password
    ); //comes from mapDispatchToProps
    this.setState({ username: '', email: '', password: '' }); //reset form to initial state
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
              label='username'
              placeholder='username'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              label='Email'
              placeholder='Email'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              type='password'
              label='password'
              placeholder='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type='submit'>Signup</Button>
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
    { signupUser } // from user actions store
  )(SignupForm)
);
