import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ReactMapGL, {Marker} from "react-map-gl";
import FleetStatistics from "./components/FleetStatistics";
import SearchableVehicleDetails from "./components/SearchableVehicleDetails";

class App extends Component {
  constructor() {
    super();
    this.state = {
      vehicles: []
    };
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:4001");
    socket.on("vehicles-status", data => this.setState({ vehicles: data }));
  }

  render() {
    const { vehicles } = this.state;

    if(!vehicles || vehicles.length === 0) return null;

    const vehicleStatus = ["INACTIVE", "IDLE", "ACTIVE", "ERROR"];

    var vehicleStyle = function(status, bearing) {
      const vehicleStatusColor = {
        INACTIVE: "grey",
        IDLE: "orange", 
        ACTIVE: "green", 
        ERROR: "red"
      };

      var style = {};

      if(status) {
        style.color = vehicleStatusColor[status];
      }
      if(bearing) {
        style.transform = "rotate(" + (bearing % 360) + "deg)";
      }

      return style;
    }

    var markers = vehicles.map(function(vehicle) {
      return <Marker latitude={ vehicle.position[1] } longitude={ vehicle.position[0] } key={ vehicle.id }>
          <div style={ vehicleStyle(vehicleStatus[vehicle.status.id], vehicle.bearing) }>⬆</div>
        </Marker>;
    });

    var statusLegends = vehicleStatus.map(function(status) {
      return <li key={ status }>
          <span style={ vehicleStyle(status) }>{ status.toLowerCase() }</span>
        </li>;
    });

    const ACCESS_TOKEN = "pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA";

    return (
      <div>
        <figure>
          <ReactMapGL
            mapboxApiAccessToken={ ACCESS_TOKEN }
            width={400}
            height={400}
            latitude={37.755705}
            longitude={-122.447177}
            zoom={8}>
            { markers }
          </ReactMapGL>
          <figcaption>
            Vehicle status: 
            <ul>
              { statusLegends }
            </ul>
          </figcaption>
        </figure>

        <FleetStatistics vehicles={ vehicles }/>

        <SearchableVehicleDetails vehicles={ vehicles }/>
      </div>
    );
  }
}

export default App;