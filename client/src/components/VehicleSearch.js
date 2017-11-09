import React, { Component } from "react";

class VehicleSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSearchTermChange(event.target.value);
  }

  render() {
    const { vehicleNumber } = this.props;

    return (
      <form>
        <label>
          Vehicle number
          <input
            name="vehicleNumber"
            type="number"
            value={ vehicleNumber === null ? "" : vehicleNumber}
            onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default VehicleSearch;
