import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";
import { SmoothieChart, TimeSeries } from "smoothie";

const PERCENTAGE_STATS_TYPE = "percentage";
const NUMBER_STATS_TYPE = "number";

class FleetStatistics extends Component {
  constructor(props) {
    super(props);

    var state = {};
    const statistics = this.calculateStatistics();
    statistics.forEach(function(statistic) {
      state[statistic.id] = new TimeSeries();
    });

    this.state = state;
  }

  calculateStatistics(vehicles) {
    vehicles = vehicles || [];

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
      occupancyRatio += vehicle.occupancy / vehicle.max_occupancy;
      travelerTotal += vehicle.occupancy;
      vehicleStatusTotal[vehicleStatus[vehicle.status.id]] += 1;
    });

    statistics.push(
      {
        id: "occupancyRatio",
        description: "occupancy ratio of the vehicles",
        value: fleetSize ? occupancyRatio / fleetSize : 0,
        type: PERCENTAGE_STATS_TYPE
      },
      {
        id: "travelerTotal",
        description: "nb of travelers the fleet is serving",
        value: travelerTotal,
        type: NUMBER_STATS_TYPE
      }
    );

    for (var status in vehicleStatusTotal) {
      statistics.push({
        id: "statusRatio" + status,
        description: "ratio of vehicles in " + status + " state",
        value: fleetSize ? vehicleStatusTotal[status] / fleetSize : 0,
        type: PERCENTAGE_STATS_TYPE
      });
    }

    return statistics;
  }

  componentDidMount() {
    if (!this.graphs) return;

    this.graphs.forEach(function(container) {
      const smoothie = new SmoothieChart();
      smoothie.streamTo(container, 1000);
      smoothie.addTimeSeries(this.state[container.dataset.statisticId]);
    }, this);
  }

  render() {
    const { vehicles } = this.props;

    if (!vehicles || vehicles.length === 0) return null;

    const statistics = this.calculateStatistics(vehicles);

    var statisticsRow = statistics.map(function(statistic) {
      this.state[statistic.id].append(new Date().getTime(), statistic.value); // uhm... not supposed to set the state like that?

      return (
        <tr key={statistic.id}>
          <td>{statistic.description}</td>
          <td>
            {statistic.type === PERCENTAGE_STATS_TYPE
              ? +Math.round(statistic.value * 100) + "%"
              : statistic.value}
          </td>
          <td>
            <canvas
              data-stastistic-id={statistic.id}
              ref={element => {
                this.graphs
                  ? this.graphs.push(element)
                  : (this.graphs = [element]);
              }}
              width="400"
              height="100"
            />
          </td>
        </tr>
      );
    }, this);

    return (
      <section>
        <h1>Fleet statistics</h1>
        <table>
          <tbody>{statisticsRow}</tbody>
        </table>
      </section>
    );
  }
}

export default FleetStatistics;
