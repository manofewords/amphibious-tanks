import React, { Component } from "react";
import "./vehicleSearch.css";

class VehicleSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    this.props.onSearchTermChange(event.target.value);
  }

  resetForm() {
    this.props.onSearchTermChange();
  }

  render() {
    const { vehicleNumber } = this.props;

    return (
      <form className="vehicle-search">
        <label>
          Vehicle number
          <input
            placeholder="VHC-…"
            name="vehicleNumber"
            type="number"
            value={vehicleNumber === null ? "" : vehicleNumber}
            onChange={this.handleChange}
          />
        </label>
        <input type="reset" value="Clear" onClick={this.resetForm} />
      </form>
    );
  }
}

export default VehicleSearch;
