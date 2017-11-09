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
      focusedVehicleNumber: null
    };

    this.handleFocusedVehicleNumberChange = this.handleFocusedVehicleNumberChange.bind(this);
  }

  handleFocusedVehicleNumberChange(value) {
    this.setState({
      focusedVehicleNumber: value
    });
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:4001");
    socket.on("vehicles-status", data => this.setState({ vehicles: data }));
  }

  render() {
    const { vehicles, focusedVehicleNumber } = this.state;

    if(!vehicles || vehicles.length === 0) return null;

    return (
      <div>
        <figure>
          <FleetMap vehicles={ vehicles } focusedVehicleNumber={ focusedVehicleNumber }/>
          <FleetMapLegend/>
        </figure>
        <FleetStatistics vehicles={ vehicles }/>
        <SearchableVehicleDetails vehicles={ vehicles } vehicleNumber={ focusedVehicleNumber } onSearchTermChange={ this.handleFocusedVehicleNumberChange }/>
      </div>
    );
  }
}

export default App;
