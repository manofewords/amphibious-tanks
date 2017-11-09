import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker";

const SAN_FRANCISCO_LATITUDE = 37.755705;
const SAN_FRANCISCO_LONGITUDE = -122.447177;
const ACCESS_TOKEN = "pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA";

class FleetMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: SAN_FRANCISCO_LATITUDE,
        longitude: SAN_FRANCISCO_LONGITUDE,
        zoom:8
      }
    };

    this.handleMapViewportChange = this.handleMapViewportChange.bind(this);
  }

  handleMapViewportChange(viewport) {    
    this.setState({
      viewport: viewport
    });
  }

  render() {
    const { vehicles } = this.props;
    const { width, height, latitude, longitude, zoom } = this.state.viewport;

    if(!vehicles || vehicles.length === 0) return null;

    var vehicleMarkers = vehicles.map(function(vehicle) {
      return <VehicleMarker key={ vehicle.id } vehicle={ vehicle }/>;
    });

    return (
      <ReactMapGL
        mapboxApiAccessToken={ ACCESS_TOKEN }
        width={ width }
        height={ height }
        latitude={ latitude }
        longitude={ longitude }
        zoom={ zoom }
        onViewportChange={ this.handleMapViewportChange }>
        { vehicleMarkers }
      </ReactMapGL>
    );
  }
}

export default FleetMap;
