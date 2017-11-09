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

    const PERCENTAGE_STATS_TYPE = "percentage";
    const NUMBER_STATS_TYPE = "number";    

    var fleetStatistics = function() {
      var statistics = [],
        occupancyRatio = 0,
        travelerTotal = 0,
        fleetSize = vehicles.length,
        vehicleStatusTotal = {
          INACTIVE: 0,
          IDLE: 0, 
          ACTIVE: 0, 
          ERROR: 0
        };

      vehicles.forEach(function(vehicle) {
        occupancyRatio += (vehicle.occupancy / vehicle.max_occupancy);
        travelerTotal += vehicle.occupancy;
        vehicleStatusTotal[vehicleStatus[vehicle.status.id]] += 1;
      });

      statistics.push({
        id: "occupancyRatio",
        description: "occupancy ratio of the vehicles",
        value: occupancyRatio / fleetSize,
        type: PERCENTAGE_STATS_TYPE
      }, {
        id: "travelerTotal",
        description: "nb of travelers the fleet is serving",
        value: travelerTotal,
        type: NUMBER_STATS_TYPE
      });

      for(var status in vehicleStatusTotal) {
        statistics.push({
          id: "statusRatio" + status,
          description: "ratio of vehicles in " + status + " state",
          value: vehicleStatusTotal[status] / fleetSize,
          type: PERCENTAGE_STATS_TYPE
        });
      }

      return statistics;
    };

    var statisticsRow = fleetStatistics().map(function(statistic) {
      return <tr key={ statistic.id }>
          <td>{ statistic.description }</td>
          <td>{ statistic.type === PERCENTAGE_STATS_TYPE ? + Math.round(statistic.value * 100) + "%" : statistic.value }</td>
        </tr>;
    });

    return (
      <div>
        <figure>
          <ReactMapGL
            mapboxApiAccessToken="pk.eyJ1IjoibWFub2Zld29yZHMiLCJhIjoiY2o5c2ExZDQ1NjAyaDJxcXNtbzBjY2FjOSJ9.deGZaKnb9EoJKVl969U-HA"
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

        <section>
          Fleet statistics:
          <table>
            <tbody>
            { statisticsRow }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;