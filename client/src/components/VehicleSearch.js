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
    return (
      <form>
        <label>
          Vehicle number
          <input
            name="vehicleNumber"
            type="number"
            value={ this.props.vehicleNumber === null ? "" : this.props.vehicleNumber}
            onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default VehicleSearch;
