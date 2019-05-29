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

    // use bind to explicitly bind 'this' to the class: this.onSearchQuery is context-bound to 'this'
    this.onSearchQuery = this.onSearchQuery.bind(this);
  }

  componentDidMount() {
    console.log('%c HOMEPAGE componentDidMount: ', 'color: green');

    this.props.fetchCampgrounds(this.state.searchQuery);
  }

  onSearchQuery(query) {
    // console.log(event.target.value);
    debugger;
    this.setState({ ...this.state, searchQurey: query['value'] });
    this.props.fetchCampgrounds(this.state.searchQuery);
  }

  render() {
    return (
      <Fragment>
        <div>
          <SearchBar onSearchQuery={this.onSearchQuery} />
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
