import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router';
import { loginUser } from '../actions/user';
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
    this.props.loginUser(this.state.username, this.state.password); //comes from mapDispatchToProps
    this.setState({ username: '', password: '' }); //reset form to initial state
  };

  render() {
    console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props);
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
              type='password'
              label='password'
              placeholder='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type='submit'>Login</Button>
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
    { loginUser }
  )(LoginForm)
);
