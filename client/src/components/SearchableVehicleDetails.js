import React, { Component } from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleDetails from "./VehicleDetails";

class SearchableVehicleDetails extends Component {
  render() {
    const { focusedVehicle, onSearchTermChange } = this.props;

    var vehicleNumber = null;
    if (focusedVehicle && focusedVehicle.name) {
      vehicleNumber = focusedVehicle.name.replace("VHC-", "");
    }

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
