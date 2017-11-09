import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("focuses on a vehicle with given id", () => {
  const wrapper = shallow(<App />);

  // default value
  expect(wrapper.state().focusedVehicleId).toEqual(null);

  // focus on an existing vehicle
  wrapper.instance().handleFocusedVehicleIdChange("foo");
  expect(wrapper.state().focusedVehicleId).toEqual("foo");
});

it("focuses on a vehicle with given name", () => {
  const vehicles = [
    {
      id: "foo",
      name: "VHC-1"
    }
  ];

  const wrapper = shallow(<App />);

  wrapper.setState({
    vehicles: vehicles
  });

  // default value
  expect(wrapper.state().focusedVehicleId).toEqual(null);

  // focus on an existing vehicle
  wrapper.instance().handleFocusedVehicleNumberChange(1);
  expect(wrapper.state().focusedVehicleId).toEqual("foo");

  // cannot focus on a non-existing vehicle
  wrapper.instance().handleFocusedVehicleNumberChange(2);
  expect(wrapper.state().focusedVehicleId).toEqual(null);
});
