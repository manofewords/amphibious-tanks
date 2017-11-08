
const pubsub = require('pubsub-js')
const startFleet = require('./vehicles/vhcGenerator')(500)   // nb of vehicles in the fleet

/**
 * subscribe to pubsub event to receive vehicle status
 * topic: name of the topic,
 * vehicles: array of vehicle status message
 *
 * Feel free to move/encapsulate this function where you want
 */
pubsub.subscribe('vehicles-status', (topic, vehicles) => {
  // TODO: 'vehicles' contains data for all vehicles in the fleet
  console.log('received', topic, vehicles)
})

/**
 * Starts generating messages from each vehicles in the fleet :
 * Each second, status for all vehicles are published through pubsub
 * in the topic 'vehicles-status'
 * DO NOT REMOVE THIS LINE (or you'll get disconnected form the backend)
 */
startFleet()
console.log('Fleet operations started')