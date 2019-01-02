const express = require('express');
const path    = require('path');
const http    = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname+'/public');
console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("user connection")

    socket.on('disconnect', () => {
      console.log('User was disconnected from server');
    });
});


server.listen(port, () => {
  console.log(`listening on ${port}`);
});