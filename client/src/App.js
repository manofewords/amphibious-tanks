import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import FleetMap from "./components/FleetMap";
import FleetMapLegend from "./components/FleetMapLegend";
import FleetStatistics from "./components/FleetStatistics";
import SearchableVehicleDetails from "./components/SearchableVehicleDetails";

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
      <div>
        <figure>
          <FleetMap
            vehicles={vehicles}
            focusedVehicle={focusedVehicle}
            onVehicleClick={this.handleFocusedVehicleIdChange}
          />
          <FleetMapLegend />
        </figure>
        <FleetStatistics vehicles={vehicles} />
        <SearchableVehicleDetails
          vehicles={vehicles}
          focusedVehicle={focusedVehicle}
          onSearchTermChange={this.handleFocusedVehicleNumberChange}
        />
      </div>
    );
  }
}

export default App;
