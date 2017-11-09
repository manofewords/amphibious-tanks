import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ReactMapGL, {Marker} from 'react-map-gl';

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

    const vehicleStatus = ["INACTIVE", "IDLE", "ACTIVE", "ERROR"];

    var vehicleSymbol = function(status) {
      const vehicleStatusColor = {
        INACTIVE: "grey",
        IDLE: "orange", 
        ACTIVE: "green", 
        ERROR: "red"
      };

      return <span style={ {color: vehicleStatusColor[status]} }>•</span>;
    }

    var markers = vehicles.map(function(vehicle) {
      return <Marker latitude={ vehicle.position[1] } longitude={ vehicle.position[0] } key={ vehicle.id }>
        { vehicleSymbol(vehicleStatus[vehicle.status.id]) }
        </Marker>;
    });

    var statusLegends = vehicleStatus.map(function(status) {
      return <li key={ status }>{ vehicleSymbol(status) } { status.toLowerCase() }</li>;
    });

    return (
      <figure>
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA"
          width={400}
          height={400}
          latitude={37.7577}
          longitude={-122.4376}
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
    );
  }
}

export default App;