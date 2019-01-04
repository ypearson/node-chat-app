const express = require('express');
const path    = require('path');
const http    = require('http');
const socketIO = require('socket.io');

const {generateMessage,
       generateLocationMessage} = require('./util/message')

const publicPath = path.join(__dirname, '../public');

console.log(__dirname+'/public');
console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("user connection");

    // emit to current user connection
    socket.emit('newMessageEvent',
        generateMessage('admin',"Welcome to chat"));

    // emit to all users except originating user
    socket.broadcast.emit('newMessageEvent',
        generateMessage('admin','User joined chat channel'));

    socket.on('createMessageEvent', (message, eventCallback)=>{
        console.log(message);
        eventCallback('data from server');
        io.emit('newMessageEvent', generateMessage(message.from,message.text));
    });

    socket.on('createLocationMessageEvent',(msg) => {
        console.log(msg.latitude, msg.longitude);
        io.emit('newLocationMessageEvent', generateLocationMessage('admin', msg.latitude, msg.longitude));
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected from server');
    });
});


server.listen(port, () => {
  console.log(`listening on ${port}`);
});