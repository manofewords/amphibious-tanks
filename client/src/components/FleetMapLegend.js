import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";
import "../vehicleStatus.css";

class FleetMapLegend extends Component {
  render() {
    var statusLegends = vehicleStatus.map(function(status) {
      status = status.toLowerCase();

      return (
        <li key={ status }>
          <span className={ "vehicle-status-" + status }>{ status }</span>
        </li>
      );
    });

    return (
      <figcaption>
        <h1>Vehicle status</h1> 
        <ul>
          { statusLegends }
        </ul>
      </figcaption>
    );
  }
}

export default FleetMapLegend;
