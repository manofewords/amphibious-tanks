const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const pubsub = require('pubsub-js');
const startFleet = require('./vehicles/vhcGenerator')(500);

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    pubsub.subscribe("vehicles-status", (topic, vehicles) => {
        socket.emit("vehicles-status", vehicles);
    })

    startFleet();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
