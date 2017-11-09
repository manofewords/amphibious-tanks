import React, { Component } from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleDetails from "./VehicleDetails";

class SearchableVehicleStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicleNumber: null
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange(value) {
    this.setState({
      vehicleNumber: value
    });
  }

  render() {
    const { vehicleNumber } = this.state;
    const { vehicles } = this.props;

    const vehicle = vehicles.find(function(vehicle) {
      return vehicle.name === "VHC-" + vehicleNumber;
    });

    return (
      <section>
        <h1>Vehicle details</h1>
        <VehicleSearch vehicleNumber={ vehicleNumber } onSearchTermChange={ this.handleSearchTermChange } />
        <VehicleDetails vehicle={ vehicle }/>
      </section>
    );
  }
}

export default SearchableVehicleStatus;
