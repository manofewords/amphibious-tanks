# BestMile Web Engineer assignment

Welcome to the awesome world of connected, autonomous vehicles.

This Node.JS boilerplate is connected to a very robust distributed backend that manage a fleet of more than 500 vehicles.
All these vehicles send real time data to this backend to be processed by very advanced, complicated algorithms.

We made this data available for you in the file `index.js`. You can access it by listening to the topic `vehicles-status` as demonstrated.

*Your mission is to make this data available to the fleet manager (remote operator) through a web interface*

## Instructions :

* Expose the data through a Node.JS web server so it can be consumed by a web client
* Create a very simple React application (you are allowed to use another framework if you think React could compromise your mission)
* Consume the data and display it on a map (you can use any map framework you like: Google, Mapbox, OpenLayer, ...)
* Make sure you display only relevant data to the operator (what relevant means is up to you. you may look into vehicle status, e.g.)
* Some vehicles can have problems and will raise them through an 'ERROR' status. This information is very important for the remote operator
* Provide statistics you feel are important to the operator or his company. Some example could be :
  * occupancy ratio of the vehicles,
  * error ratio of the vehicles,
  * nb of travelers the fleet is serving/has served
  * ... your pick ?
* Provide a search function on the UI for the operator to select a single vehicle for advanced monitoring :
  * Display more information about this vehicle
  * Center the map on this vehicle

### Additional notes :

* Make sure your web application is robust. Provide tests with your assignment
* Please provide the full git history with the assignment
* Our vehicles are amphibious tanks. Don't be surprised. They can go through walls and in the water.

## We'll evaluate the assignment according to the following criterias

* Architecture of the front-end (framework/packages use, build scripts and optimization, tests, state management)
* Architecture of the service (what and how data are exposed)
* Code style and organization
* Performance (especially for the front-end)
* Bonus : UX
  * Information hierarchy
  * How and what information is presented (especially regarding the map)
  * This part can be subjective and open to creativity
* Bonus : relevant feedback about this assignment and how we can improve it :)

## Vehicle structure type
```
 {
   id: string
   status: {
     id:  number                 // INACTIVE = 0, IDLE = 1, ACTIVE = 2, ERROR = 3
     msg: string
   }
   position: [number, number]    // [lng, lat]
   bearing: number
   speed: number                 // m/s
   occupancy: number
 }
```
