import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/userActions';

const Navbar = ({ logoutUser, user: { loggedIn }, location: { pathname } }) => {
  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <Menu.Item
            as={NavLink}
            to='/profile'
            name='Profile'
            active={pathname === '/profile'}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              as={NavLink}
              to='/'
              name='Logout'
              active={pathname === '/'}
              onClick={() => {
                logoutUser(); //comes from mapDispatchToProps
              }}
            />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Menu position='right'>
          {pathname === '/login' ? (
            <Menu.Item as={NavLink} to='/signup' name='Signup' />
          ) : (
            <Menu.Item as={NavLink} to='/login' name='Login' />
          )}
        </Menu.Menu>
      )}
    </Menu>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
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
