import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampgrounds } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';

import SearchBar from '../components/SearchBar';
import CampgroundsContainer from './CampgroundsContainer';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'FL',
      activePage:
        props.campgroundsData.searchParamsOffset > 0
          ? props.campgroundsData.searchParamsOffset /
              props.campgroundsData.searchParamsLimit +
            1
          : 1
    };

    // use bind to explicitly bind 'this' to the class: this.onSearchQuery is context-bound to 'this'
    this.onSearchQuery = this.onSearchQuery.bind(this);
    console.log('%c HOMEPAGE constructor: ', 'color: teal', this.state);
  }

  componentDidMount() {
    console.log('%c HOMEPAGE componentDidMount: ', 'color: teal', this.state);
    this.props.fetchCampgrounds(this.state.searchQuery, this.state.activePage);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      '%c HOMEPAGE componentDidUpdate: ',
      'color: teal',
      this.state,
      ' prevState:',
      prevState,
      ' prevProps:',
      prevProps
    );

    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.activePage !== prevState.activePage
    ) {
      this.props.fetchCampgrounds(
        this.state.searchQuery,
        this.state.activePage
      );
    }
  }

  // arrow function automatically binds 'this'
  // implictly bind this base on the surrounding context by using arrow function
  // onSearchQuery = (query) => {
  onSearchQuery(query) {
    this.setState({ searchQuery: query['value'], activePage: 1 });
    console.log(
      '%c HOMEPAGE onSearchQuery: ',
      'color: teal',
      this.state,
      query['value']
    );
  }

  onPaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  render() {
    console.log('%c HOMEPAGE render: ', 'color: teal');
    return (
      <Fragment>
        <SearchBar onSearchQuery={this.onSearchQuery} />
        <CampgroundsContainer
          searchQuery={this.state.searchQuery}
          activePage={this.state.activePage}
          handlePaginationChange={this.onPaginationChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    campgroundsData: state.campgrounds.campgroundsData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCampgrounds
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
