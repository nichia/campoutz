import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampgrounds } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';

import SearchBar from '../components/SearchBar';
import CampgroundsContainer from './CampgroundsContainer';

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'FL',
      page: 1
    };

    // use bind to explicitly bind 'this' to the class: this.onSearchQuery is context-bound to 'this'
    this.onSearchQuery = this.onSearchQuery.bind(this);
    console.log(
      '%c HOMEPAGE constructor: ',
      'color: green',
      this.state.searchQuery
    );
  }

  componentDidMount() {
    console.log('%c HOMEPAGE componentDidMount: ', 'color: green', this.state);
    this.props.fetchCampgrounds(this.state.searchQuery, this.state.page);
  }

  // arrow function automatically binds 'this'
  // implictly bind this base on the surrounding context by using arrow function
  // onSearchQuery = (query) => {
  onSearchQuery(query) {
    // setState is asynchronous, so use setState callback to invoke fetchCampgrounds function
    // to ensure this.state argument is the updated state
    this.setState(
      {
        searchQuery: query['value']
      },
      () => this.props.fetchCampgrounds(this.state.searchQuery, this.state.page)
    );
    console.log('%c HOMEPAGE onSearchQuery: ', 'color: green', this.state);
  }

  render() {
    console.log('%c HOMEPAGE render: ', 'color: green');
    return (
      <Fragment>
        <SearchBar onSearchQuery={this.onSearchQuery} />
        <CampgroundsContainer searchQuery={this.state.searchQuery} />
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
