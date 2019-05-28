import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampgrounds } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';

import SearchBar from './SearchBar';
import CampgroundsList from './CampgroundsList';

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'FL'
    };
  }

  componentDidMount() {
    this.props.fetchCampgrounds(this.state.searchQuery);
  }

  render() {
    return (
      <Fragment>
        <div>
          <SearchBar />
        </div>
        <div>
          <CampgroundsList />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCampgrounds
    },
    dispatch
  );

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(HomePage)
);
