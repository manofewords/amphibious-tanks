import React, { Component } from "react";

class VehicleDetails extends Component {
  render() {
    const { vehicle } = this.props;

    if(!vehicle || !vehicle.id) return null;

    return (
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td>{ vehicle.name }</td>
          </tr><tr>
            <td>id</td>
            <td>{ vehicle.id }</td>
          </tr><tr>
            <td>status</td>
            <td>{ vehicle.status.id }</td>
          </tr><tr>
            <td>status message</td>
            <td>{ vehicle.status.msg }</td>
          </tr><tr>
            <td>longitude</td>
            <td>{ vehicle.position[0] }</td>
          </tr><tr>
            <td>latitude</td>
            <td>{ vehicle.position[1] }</td>
          </tr><tr>
            <td>bearing</td>
            <td>{ vehicle.bearing }</td>
          </tr><tr>
            <td>speed</td>
            <td>{ vehicle.speed }</td>
          </tr><tr>
            <td>occupancy</td>
            <td>{ vehicle.occupancy }</td>
          </tr><tr>
            <td>max_occupancy</td>
            <td>{ vehicle.max_occupancy }</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default VehicleDetails;
