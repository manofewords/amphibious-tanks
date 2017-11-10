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
      <section className="searchable-vehicle-details">
        <h2>Vehicle details</h2>
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
