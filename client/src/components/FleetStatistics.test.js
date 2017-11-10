import React from "react";
import ReactDOM from "react-dom";
import FleetStatistics from "./FleetStatistics";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FleetStatistics />, div);
});

it("calculates statistics, even when the vehicles fleet is empty", () => {
  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics()).toEqual([
    {
      description: "Occupancy ratio of the vehicles",
      id: "occupancyRatio",
      type: "percentage",
      value: 0
    },
    {
      description: "Nb of travelers the fleet is serving",
      id: "travelerTotal",
      type: "number",
      value: 0
    },
    {
      description: "Ratio of vehicles in INACTIVE state",
      id: "statusRatioINACTIVE",
      type: "percentage",
      value: 0
    },
    {
      description: "Ratio of vehicles in IDLE state",
      id: "statusRatioIDLE",
      type: "percentage",
      value: 0
    },
    {
      description: "Ratio of vehicles in ACTIVE state",
      id: "statusRatioACTIVE",
      type: "percentage",
      value: 0
    },
    {
      description: "Ratio of vehicles in ERROR state",
      id: "statusRatioERROR",
      type: "percentage",
      value: 0
    }
  ]);
});

it("calculates the occupancy ratio of the vehicles", () => {
  const vehicles = [
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 500,
      max_occupancy: 1000
    }
  ];
  // vehicle 1 is full (100%), vehicle 2 is half full (50%), so the average occupancy is 75%
  const expectedResult = 0.75;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[0].value).toEqual(
    expectedResult
  );
});

it("calculates the nb of travelers the fleet is serving", () => {
  const vehicles = [
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    }
  ];
  const expectedResult = 2;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[1].value).toEqual(
    expectedResult
  );
});

it("ratio of vehicles in INACTIVE state", () => {
  const vehicles = [
    {
      status: { id: 0 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 1 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 3 },
      occupancy: 1,
      max_occupancy: 1
    }
  ];
  const expectedResult = 0.25;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[2].value).toEqual(
    expectedResult
  );
});

it("ratio of vehicles in IDLE state", () => {
  const vehicles = [
    {
      status: { id: 0 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 1 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 3 },
      occupancy: 1,
      max_occupancy: 1
    }
  ];
  const expectedResult = 0.25;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[3].value).toEqual(
    expectedResult
  );
});

it("ratio of vehicles in ACTIVE state", () => {
  const vehicles = [
    {
      status: { id: 0 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 1 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 3 },
      occupancy: 1,
      max_occupancy: 1
    }
  ];
  const expectedResult = 0.25;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[4].value).toEqual(
    expectedResult
  );
});

it("ratio of vehicles in ERROR state", () => {
  const vehicles = [
    {
      status: { id: 0 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 1 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 2 },
      occupancy: 1,
      max_occupancy: 1
    },
    {
      status: { id: 3 },
      occupancy: 1,
      max_occupancy: 1
    }
  ];
  const expectedResult = 0.25;

  const wrapper = shallow(<FleetStatistics />);

  expect(wrapper.instance().calculateStatistics(vehicles)[5].value).toEqual(
    expectedResult
  );
});
