import React, { Component } from "react";
import { Marker } from "react-map-gl";
import { vehicleStatus } from "../vehicleStatus";
import "../vehicleStatus.css";

class VehicleMarker extends Component {
  vehicleStyle(bearing) {
    var style = {};

    if (bearing) {
      style.transform = "rotate(" + bearing % 360 + "deg)";
    }

    return style;
  }

  render() {
    const { vehicle, onVehicleClick } = this.props;

    if (!vehicle) return null;

    return (
      <Marker
        latitude={vehicle.position[1]}
        longitude={vehicle.position[0]}
        key={vehicle.id}
      >
        <div
          className={
            "vehicle-status-" + vehicleStatus[vehicle.status.id].toLowerCase()
          }
          style={this.vehicleStyle(vehicle.bearing)}
          data-vehicle-id={vehicle.id}
          onClick={onVehicleClick}
        >
          ⬆
        </div>
      </Marker>
    );
  }
}

export default VehicleMarker;
