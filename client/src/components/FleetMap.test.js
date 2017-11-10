import React from "react";
import ReactDOM from "react-dom";
import FleetMap from "./FleetMap";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FleetMap />, div);
});

it("handles viewport changes", () => {
  const newViewport = {
    width: 1,
    height: 2,
    latitude: 3,
    longitude: 4,
    zoom: 5
  };

  const wrapper = shallow(<FleetMap />);

  // default value
  expect(wrapper.state().viewport).toEqual({
    width: 490,
    height: 490,
    latitude: 37.755705,
    longitude: -122.447177,
    zoom: 8
  });

  // viewport has changed (e.g. through user interaction)
  wrapper.instance().handleMapViewportChange(newViewport);
  expect(wrapper.state().viewport).toEqual(newViewport);
});
