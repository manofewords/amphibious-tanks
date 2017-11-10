import React, { Component } from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleDetails from "./VehicleDetails";

class SearchableVehicleDetails extends Component {
  extractVehicleNumber(vehicle) {
    if (vehicle && vehicle.name) {
      return vehicle.name.replace("VHC-", "");
    }
    return null;
  }

  render() {
    const { focusedVehicle, onSearchTermChange } = this.props;
    const vehicleNumber = this.extractVehicleNumber(focusedVehicle);

    return (
      <section>
        <h1>Vehicle details</h1>
        <VehicleSearch
          vehicleNumber={vehicleNumber}
          onSearchTermChange={onSearchTermChange}
        />
        <VehicleDetails vehicle={focusedVehicle} />
      </section>
    );
  }
}

export default SearchableVehicleDetails;
