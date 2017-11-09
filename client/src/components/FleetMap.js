import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker";

const SAN_FRANCISCO_LATITUDE = 37.755705;
const SAN_FRANCISCO_LONGITUDE = -122.447177;
const ACCESS_TOKEN = "pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA";

class FleetMap extends Component {
  render() {
    const { vehicles } = this.props;

    if(!vehicles || vehicles.length === 0) return null;

    var vehicleMarkers = vehicles.map(function(vehicle) {
      return <VehicleMarker key={ vehicle.id } vehicle={ vehicle }/>;
    });

    return (
      <ReactMapGL
        mapboxApiAccessToken={ ACCESS_TOKEN }
        width={400}
        height={400}
        latitude={SAN_FRANCISCO_LATITUDE}
        longitude={SAN_FRANCISCO_LONGITUDE}
        zoom={8}>
        { vehicleMarkers }
      </ReactMapGL>
    );
  }
}

export default FleetMap;
