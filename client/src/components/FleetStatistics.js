import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";

const PERCENTAGE_STATS_TYPE = "percentage";
const NUMBER_STATS_TYPE = "number";   

class FleetStatistics extends Component {  
  calculateStatistics(vehicles) {
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
  }

  render() {
    const { vehicles } = this.props;

    if(!vehicles || vehicles.length === 0) return null;

    const statistics = this.calculateStatistics(vehicles);

    var statisticsRow = statistics.map(function(statistic) {
      return <tr key={ statistic.id }>
          <td>{ statistic.description }</td>
          <td>{ statistic.type === PERCENTAGE_STATS_TYPE ? + Math.round(statistic.value * 100) + "%" : statistic.value }</td>
        </tr>;
    });

    return (
      <section>
        <h1>Fleet statistics</h1>
        <table>
          <tbody>
          { statisticsRow }
          </tbody>
        </table>
      </section>
    );
  }
}

export default FleetStatistics;
