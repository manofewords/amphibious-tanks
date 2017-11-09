import React, { Component } from "react";

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
      <form>
        <label>
          Vehicle number
          <input
            name="vehicleNumber"
            type="number"
            value={ vehicleNumber === null ? "" : vehicleNumber}
            onChange={ this.handleChange }/>
          <input 
            type="reset" 
            value="Clear"
            onClick={ this.resetForm }/>
        </label>
      </form>
    );
  }
}

export default VehicleSearch;
