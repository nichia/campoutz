import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapStyle = {
  width: '98%',
  height: '98%'
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      geoCampgrounds: this.getGeoCampgrounds() //Campgrounds with geo coordinates
    };
  }

  getGeoCampgrounds = () => {
    let newArr = [];
    for (let i = 0; i < this.props.campgrounds.length; i++) {
      if (this.props.campgrounds[i].GEOJSON.COORDINATES) {
        // only process campgrounds with GEOJSON.COORDINATES[lng, lat]
        const coords = this.props.campgrounds[i].GEOJSON.COORDINATES;
        newArr.push({
          FacilityID: this.props.campgrounds[i].FacilityID,
          FacilityName: this.props.campgrounds[i].FacilityName,
          latLng: { lat: coords[1], lng: coords[0] }
        });
      }
    }
    return newArr;
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.geoCampgrounds.map(campground => {
      return (
        <Marker
          key={campground.FacilityID}
          id={campground.FacilityID}
          name={campground.FacilityName}
          position={campground.latLng}
          onClick={this.onMarkerClick}
        />
      );
    });
  };

  render() {
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.geoCampgrounds.length; i++) {
      bounds.extend(this.state.geoCampgrounds[i].latLng);
    }

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyle}
          initialCenter={this.state.geoCampgrounds[0].latLng}
          bounds={bounds}
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    campgrounds: state.campgrounds.campgroundsData.allCampgrounds
  };
};

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(connect(mapStateToProps)(MapContainer));
