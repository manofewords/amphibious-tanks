import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";
import "./vehicleDetails.css";

class VehicleDetails extends Component {
  render() {
    const { vehicle } = this.props;

    if (!vehicle || !vehicle.id) return null;

    const status = vehicleStatus[vehicle.status.id].toLowerCase();

    return (
      <table className="vehicle-details">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{vehicle.name}</td>
          </tr>
          <tr>
            <td>Id</td>
            <td>{vehicle.id}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td className={"vehicle-status-" + status}>{status}</td>
          </tr>
          <tr>
            <td>Message</td>
            <td>{vehicle.status.msg}</td>
          </tr>
          <tr>
            <td>Longitude</td>
            <td>{Number(vehicle.position[0]).toFixed(4)}</td>
          </tr>
          <tr>
            <td>Latitude</td>
            <td>{Number(vehicle.position[1]).toFixed(4)}</td>
          </tr>
          <tr>
            <td>Bearing</td>
            <td>{Math.round(vehicle.bearing % 360)} [º]</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>{Math.round(vehicle.speed)} [m/s]</td>
          </tr>
          <tr>
            <td>Occupancy</td>
            <td>
              {vehicle.occupancy} / {vehicle.max_occupancy}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default VehicleDetails;
