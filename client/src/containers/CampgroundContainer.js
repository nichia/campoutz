import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampground } from '../actions/campgrounds';
import { bindActionCreators } from 'redux';
import CampgroundView from '../components/CampgroundView';

export class Campground extends Component {
  constructor(props) {
    super();
    this.campgroundID = props.match.params.id;
  }

  componentDidMount() {
    console.log(
      '%c Campground componentDidMount: ',
      'color: orange',
      this.props
    );

    this.props.fetchCampground(this.campgroundID);
  }
  render() {
    return (
      <div>
        <CampgroundView campground={this.props.campground} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campground: state.campgrounds.currentCampground
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCampground
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campground);
