import React, { Component } from "react";
import { vehicleStatus } from "../vehicleStatus";
import { SmoothieChart, TimeSeries } from "smoothie";
import "./fleetStatistics.css";

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
        description: "Occupancy ratio of the vehicles",
        value: fleetSize ? occupancyRatio / fleetSize : 0,
        type: PERCENTAGE_STATS_TYPE
      },
      {
        id: "travelerTotal",
        description: "Nb of travelers the fleet is serving",
        value: travelerTotal,
        type: NUMBER_STATS_TYPE
      }
    );

    for (var status in vehicleStatusTotal) {
      statistics.push({
        id: "statusRatio" + status,
        description: "Ratio of vehicles in " + status + " state",
        value: fleetSize ? vehicleStatusTotal[status] / fleetSize : 0,
        type: PERCENTAGE_STATS_TYPE
      });
    }

    return statistics;
  }

  componentDidMount() {
    if (!this.graphs) return;

    this.graphs.forEach(function(container) {
      const smoothie = new SmoothieChart({ responsive: true });
      smoothie.streamTo(container, 1000);
      smoothie.addTimeSeries(this.state[container.dataset.statisticId]);
    }, this);
  }

  render() {
    const { vehicles } = this.props;

    if (!vehicles || vehicles.length === 0) return null;

    const statistics = this.calculateStatistics(vehicles);

    var statisticsElements = statistics.map(function(statistic) {
      this.state[statistic.id].append(new Date().getTime(), statistic.value); // uhm... not supposed to set the state like that?

      return (
        <div key={statistic.id}>
          <div className="stat-description">{statistic.description}</div>
          <div className="stat-value">
            {statistic.type === PERCENTAGE_STATS_TYPE
              ? +Math.round(statistic.value * 100) + " [%]"
              : statistic.value}
          </div>
          <canvas
            className="stat-graph"
            data-statistic-id={statistic.id}
            ref={element => {
              this.graphs
                ? this.graphs.push(element)
                : (this.graphs = [element]);
            }}
          />
        </div>
      );
    }, this);

    return (
      <section className="fleet-statistics">
        <h2>Fleet statistics</h2>
        <div className="stats-container">{statisticsElements}</div>
      </section>
    );
  }
}

export default FleetStatistics;
