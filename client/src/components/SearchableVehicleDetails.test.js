import React from "react";
import ReactDOM from "react-dom";
import SearchableVehicleDetails from "./SearchableVehicleDetails";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchableVehicleDetails />, div);
});

it("can extract a vehicle number from its name", () => {
  const wrapper = shallow(<SearchableVehicleDetails />);

  expect(wrapper.instance().extractVehicleNumber({ name: "VHC-1" })).toEqual(
    "1"
  );
});
