import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { resetLoginError, logoutUser } from '../actions/userActions';

class Navbar extends Component {
  state = { activeItem: 'campoutz' };

  handleItemClick = (e, { name, url }) => {
    this.setState({ activeItem: name });
    this.props.resetLoginError(); //comes from mapDispatchToProps
    this.props.history.push(url);
  };

  handleClickLogout = (e, { name, url }) => {
    this.setState({ activeItem: name });
    this.props.logoutUser(); //comes from mapDispatchToProps
    this.props.history.push(url);
  };

  render() {
    const { activeItem } = this.state;
    const {
      user: { loggedIn },
      location: { pathname }
    } = this.props;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='campoutz'
            active={activeItem === 'campoutz'}
            url='/'
            onClick={this.handleItemClick}
          />
          {loggedIn ? (
            <Fragment>
              <Menu.Menu position='right'>
                <Menu.Item
                  name='favorites'
                  active={activeItem === 'favorites'}
                  url='/favorites'
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='profile'
                  active={activeItem === 'profile'}
                  url='/profile'
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  url='/'
                  onClick={this.handleClickLogout}
                />
              </Menu.Menu>
            </Fragment>
          ) : (
            <Menu.Menu position='right'>
              {(pathname === '/login' && (
                <Menu.Item
                  name='signup'
                  active={activeItem === 'signup'}
                  url='/signup'
                  onClick={this.handleItemClick}
                />
              )) ||
                (pathname === '/signup' && (
                  <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    url='login'
                    onClick={this.handleItemClick}
                  />
                )) || (
                  <Fragment>
                    <Menu.Item
                      name='login'
                      active={activeItem === 'login'}
                      url='login'
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name='signup'
                      active={activeItem === 'signup'}
                      url='/signup'
                      onClick={this.handleItemClick}
                    />
                  </Fragment>
                )}
            </Menu.Menu>
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    resetLoginError: () => dispatch(resetLoginError()),
    logoutUser: () => dispatch(logoutUser()) // comes from user actions
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     logoutUser: () => dispatch({ type: actionTypes.LOGOUT })
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       logoutUser: logoutUser  // comes from user actions
//     },
//     dispatch
//   );
// };

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxNavbar = connectedToReduxHOC(Navbar)
// const connectedToReduxHOCWithRouterNavbar = withRouter(connectedToReduxNavbar)
//
// export default connectedToReduxHOCWithRouterNavbar

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
    // { logoutUser }
  )(Navbar)
);
