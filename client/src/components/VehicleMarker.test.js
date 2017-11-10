import React from "react";
import ReactDOM from "react-dom";
import VehicleMarker from "./VehicleMarker";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VehicleMarker />, div);
});

it("displays the vehicle's bearing", () => {
  const wrapper = shallow(<VehicleMarker />);

  // positive value [0, 360]
  expect(wrapper.instance().vehicleStyle(90)).toEqual({
    transform: "rotate(90deg)"
  });

  // negative value [-360, 0]
  expect(wrapper.instance().vehicleStyle(-90)).toEqual({
    transform: "rotate(-90deg)"
  });

  // positive value > 360
  expect(wrapper.instance().vehicleStyle(750)).toEqual({
    transform: "rotate(30deg)"
  });
});
