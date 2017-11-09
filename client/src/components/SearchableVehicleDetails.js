import React, { Component } from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleDetails from "./VehicleDetails";

class SearchableVehicleStatus extends Component {
  render() {
    const { vehicles, vehicleNumber, onSearchTermChange } = this.props;

    const vehicle = vehicles.find(function(vehicle) {
      return vehicle.name === "VHC-" + vehicleNumber;
    });

    return (
      <section>
        <h1>Vehicle details</h1>
        <VehicleSearch vehicleNumber={ vehicleNumber } onSearchTermChange={ onSearchTermChange } />
        <VehicleDetails vehicle={ vehicle }/>
      </section>
    );
  }
}

export default SearchableVehicleStatus;
