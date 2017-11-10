import React, { Component } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import VehicleMarker from "./VehicleMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import "./fleetMap.css";

const SAN_FRANCISCO_LATITUDE = 37.755705;
const SAN_FRANCISCO_LONGITUDE = -122.447177;
const ACCESS_TOKEN =
  "pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA";
const DEFAULT_ZOOM_LEVEL = 8;
const FOCUSED_ZOOM_LEVEL = 13;

class FleetMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 490,
        height: 490,
        latitude: SAN_FRANCISCO_LATITUDE,
        longitude: SAN_FRANCISCO_LONGITUDE,
        zoom: DEFAULT_ZOOM_LEVEL
      }
    };

    this.handleMapViewportChange = this.handleMapViewportChange.bind(this);
    this.handleVehicleClick = this.handleVehicleClick.bind(this);
  }

  handleMapViewportChange(viewport) {
    this.setState({
      viewport: viewport
    });
  }

  handleVehicleClick(event) {
    this.props.onVehicleClick(event.target.dataset.vehicleId);
  }

  render() {
    const { vehicles, focusedVehicle } = this.props;
    var { latitude, longitude, zoom } = this.state.viewport;
    const { width, height } = this.state.viewport;

    if (!vehicles || vehicles.length === 0) return null;

    var vehicleMarkers = vehicles.map(function(vehicle) {
      return (
        <VehicleMarker
          key={vehicle.id}
          vehicle={vehicle}
          onVehicleClick={this.handleVehicleClick}
        />
      );
    }, this);

    if (focusedVehicle && focusedVehicle.position) {
      latitude = focusedVehicle.position[1];
      longitude = focusedVehicle.position[0];
      zoom = FOCUSED_ZOOM_LEVEL;
    }

    return (
      <ReactMapGL
        mapboxApiAccessToken={ACCESS_TOKEN}
        width={width}
        height={height}
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        onViewportChange={this.handleMapViewportChange}
        onClick={this.handleMapClick}
      >
        {vehicleMarkers}
        <div className="map-navigation-container">
          <NavigationControl onViewportChange={this.handleMapViewportChange} />
        </div>
      </ReactMapGL>
    );
  }
}

export default FleetMap;
