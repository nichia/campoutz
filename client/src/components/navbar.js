import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/user';

const Navbar = ({ user: { loggedIn }, location: { pathname } }) => {
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
              to='/'
              name='Logout'
              onClick={() => {
                logoutUser();
              }}
            />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Item
          as={NavLink}
          to='/login'
          name='Login'
          active={pathname === '/login'}
        />
      )}
    </Menu>
  );
};

const mapStateToProps = ({ user }) => ({ user });

// const mapDispatchToProps = dispatch => {
//   return {
//     logoutUser: () => dispatch({ type: actionTypes.LOGOUT })
//   };
// };

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxNavbar = connectedToReduxHOC(Navbar)
// const connectedToReduxHOCWithRouterNavbar = withRouter(connectedToReduxNavbar)
//
// export default connectedToReduxHOCWithRouterNavbar

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar)
);
