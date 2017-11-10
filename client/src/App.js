import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import FleetMap from "./components/FleetMap";
import FleetMapLegend from "./components/FleetMapLegend";
import FleetStatistics from "./components/FleetStatistics";
import SearchableVehicleDetails from "./components/SearchableVehicleDetails";
import "reset-css/reset.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      vehicles: [],
      focusedVehicleId: null
    };

    this.handleFocusedVehicleNumberChange = this.handleFocusedVehicleNumberChange.bind(
      this
    );
    this.handleFocusedVehicleIdChange = this.handleFocusedVehicleIdChange.bind(
      this
    );
  }

  handleFocusedVehicleNumberChange(vehicleNumber) {
    const { vehicles } = this.state;
    const vehicle = vehicles.find(function(vehicle) {
      return vehicle.name === "VHC-" + vehicleNumber;
    });

    if (vehicle) {
      this.setState({
        focusedVehicleId: vehicle.id
      });
    } else {
      this.setState({
        focusedVehicleId: null
      });
    }
  }

  handleFocusedVehicleIdChange(vehicleId) {
    this.setState({
      focusedVehicleId: vehicleId || null
    });
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:4001");
    socket.on("vehicles-status", data => this.setState({ vehicles: data }));
  }

  render() {
    const { vehicles, focusedVehicleId } = this.state;

    if (!vehicles || vehicles.length === 0) return null;

    const focusedVehicle = vehicles.find(function(vehicle) {
      return vehicle.id === focusedVehicleId;
    });

    return (
      <div className="app-container">
        <header>
          <h1>Amphibian tanks</h1>
          <h3>Fleet monitoring</h3>
        </header>
        <main>
          <section className="vehicles">
            <figure className="fleet-map">
              <h2>Fleet map</h2>
              <FleetMap
                vehicles={vehicles}
                focusedVehicle={focusedVehicle}
                onVehicleClick={this.handleFocusedVehicleIdChange}
              />
              <FleetMapLegend />
            </figure>
            <SearchableVehicleDetails
              vehicles={vehicles}
              focusedVehicle={focusedVehicle}
              onSearchTermChange={this.handleFocusedVehicleNumberChange}
            />
          </section>
          <FleetStatistics vehicles={vehicles} />
        </main>
        <footer>
          <p>A <a href="https://github.com/manofewords/amphibious-tanks">coding assignment</a> for <a href="https://www.bestmile.com">BestMile</a> by <a href="http://plothole.net">Manu</a></p>
          <p>November 2017</p>
        </footer>
      </div>
    );
  }
}

export default App;
