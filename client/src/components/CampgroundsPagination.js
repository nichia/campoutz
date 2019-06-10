import React, { Component } from 'react';
import { Grid, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCampgrounds } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';

class CampgroundsPagination extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      activePage:
        props.campgroundsData.searchParamsOffset > 0
          ? props.campgroundsData.searchParamsOffset /
              props.campgroundsData.searchParamsLimit +
            1
          : 1
    };
    console.log(
      '%c Pagination constructor: ',
      'color: green',
      this.state.activePage,
      props.campgroundsData.searchParamsOffset,
      props.campgroundsData.searchParamsLimit
    );
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(
      '%c Pagination componentDidUpdate: ',
      'color: green',
      this.state.activePage,
      prevState,
      prevProps
    );

    if (this.state.activePage !== prevState.activPage) {
      this.props.fetchCampgrounds(
        this.props.searchQuery,
        this.state.activePage
      );
    }
  }

  render() {
    const { activePage } = this.state;

    const totalPages = Math.ceil(
      this.props.campgroundsData.totalCount /
        this.props.campgroundsData.searchParamsLimit
    );

    console.log(
      '%c Pagination render activePage: ',
      'color: green',
      activePage,
      ' totalPages:',
      totalPages
    );
    return (
      <Grid columns={1}>
        <Grid.Column textAlign='center'>
          <Pagination
            boundaryRange={1}
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            // ellipsisItem={null}
            // firstItem={null}
            // lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
          />
        </Grid.Column>
      </Grid>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampgroundsPagination);
