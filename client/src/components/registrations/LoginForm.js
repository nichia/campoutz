import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { loginUser } from "../../actions/userActions";
import { formatError } from "./FormatError";
import { Button, Form, Segment, Message } from "semantic-ui-react";

class LoginForm extends Component {
  state = { username: "", password: "" };

  handleChange = (e, semanticInputData) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    //semantic forms preventDefault for you
    // e.preventDefault()
    this.props.loginUser(this.state); //comes from mapDispatchToProps
    this.setState({ username: "", password: "" }); //reset form to initial state
  };

  render() {
    const propsError = formatError(this.props.error);

    return this.props.loggedIn ? (
      <Redirect to="/" />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.loginFailed}
        >
          <Message error header={this.props.loginFailed ? propsError : null} />
          <Form.Input
            required
            icon="user"
            iconPosition="left"
            label="Username:"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            required
            icon="lock"
            iconPosition="left"
            label="Password:"
            placeholder="password"
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Button type="submit">Login</Button>
          <br />
          <NavLink to="/signup">Not on Campoutz yet? Sign up</NavLink>
        </Form>
      </Segment>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
