import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCampgrounds,
  updateSearchState
} from "../actions/campgroundActions";
import { bindActionCreators } from "redux";
import SearchQuery from "../components/SearchQuery";
import CampgroundsContainer from "./CampgroundsContainer";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchQuery: 'FL',
      activePage:
        props.campgroundsData.searchParamsOffset > 0
          ? props.campgroundsData.searchParamsOffset /
              props.campgroundsData.searchParamsLimit +
            1
          : 1
    };

    // use bind to explicitly bind 'this' to the class: this.onSearchQuery is context-bound to 'this'
    this.onSearchQuery = this.onSearchQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.campgroundsData.allCampgrounds.length === 0) {
      this.props.fetchCampgrounds(
        this.props.searchState,
        this.state.activePage
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.searchState !== prevProps.searchState ||
      this.state.activePage !== prevState.activePage
    ) {
      this.props.fetchCampgrounds(
        this.props.searchState,
        this.state.activePage
      );
    }
  }

  onSearchQuery(queryValue) {
    if (queryValue !== this.props.searchState) {
      this.setState({ activePage: 1 });
      this.props.updateSearchState(queryValue);
    }
  }

  onPaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  render() {
    return (
      <Fragment>
        <SearchQuery onSearchQuery={this.onSearchQuery} />
        <CampgroundsContainer
          activePage={this.state.activePage}
          handlePaginationChange={this.onPaginationChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchState: state.campgrounds.searchState,
    campgroundsData: state.campgrounds.campgroundsData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCampgrounds,
      updateSearchState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
