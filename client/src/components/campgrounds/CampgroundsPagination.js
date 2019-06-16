import React, { Component } from 'react';
import { Grid, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';

class CampgroundsPagination extends Component {
  render() {
    const totalPages =
      this.props.campgroundsData.totalCount > 0
        ? Math.ceil(
            this.props.campgroundsData.totalCount /
              this.props.campgroundsData.searchParamsLimit
          )
        : 0;

    console.log(
      '%c Pagination render: ',
      'color: orange',
      this.props,
      totalPages
    );

    return (
      <Grid columns={1}>
        <Grid.Column textAlign='center'>
          <Pagination
            boundaryRange={1}
            activePage={this.props.activePage}
            onPageChange={this.props.handlePaginationChange}
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

export default connect(mapStateToProps)(CampgroundsPagination);
