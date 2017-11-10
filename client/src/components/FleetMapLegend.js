import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";
import "../vehicleStatus.css";
import "./fleetMapLegend.css";

class FleetMapLegend extends Component {
  render() {
    var statusLegends = vehicleStatus.map(function(status) {
      status = status.toLowerCase();

      return (
        <li key={status} className={"vehicle-status-" + status}>
          {status}
        </li>
      );
    });

    return (
      <figcaption className="fleet-map-legend">
        <ul>{statusLegends}</ul>
      </figcaption>
    );
  }
}

export default FleetMapLegend;
