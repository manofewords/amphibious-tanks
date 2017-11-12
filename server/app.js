const express = require("express");
const path = require('path');
const http = require("http");
const socketIo = require("socket.io");
const pubsub = require('pubsub-js');
const startFleet = require('./vehicles/vhcGenerator')(500);

const app = express();

// static server
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(3000);

// socket.io server
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
    pubsub.subscribe("vehicles-status", (topic, vehicles) => {
        socket.emit("vehicles-status", vehicles);
    })

    startFleet();
});
server.listen(4001);
