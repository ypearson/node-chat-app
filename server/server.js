const express  = require('express');
const path     = require('path');
const http     = require('http');
const socketIO = require('socket.io');

const {generateMessage,
       generateLocationMessage} = require('./util/message')

const {isRealString} = require('./util/validation')
const {Users} = require('./util/users')

const publicPath = path.join(__dirname, '../public');

console.log(__dirname+'/public');
console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var users = new Users;

io.on('connection', (socket) => {

    console.log("user connection");

    socket.on('createMessageEvent', (message, eventCallback)=>{
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessageEvent', generateMessage(user.name,message.text));
        }
        eventCallback('data from server');
    });

    socket.on('createLocationMessageEvent',(msg) => {

        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessageEvent', generateLocationMessage(user.name, msg.latitude, msg.longitude));
        }
    });

    socket.on('joinEvent', (params, eventCallback) => {
        console.log("params", params);

        if( !(isRealString(params.name) && isRealString(params.room) )) {
            return eventCallback("string error");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserListEvent', users.getListUser(params.room));

        // socket.leave(params.room);

        // emit globally vs emit by chat room (channel/group)
        // https://socket.io/docs/emit-cheatsheet/
        // io.emit -> io.to("Some chat room").emit
        // socket.broadcast.emit -> socket.broadcast.to("Some chat room").emit
        // socket.emit

        // emit to current user connection
        socket.emit('newMessageEvent',
            generateMessage('Admin',"Welcome to chat"));

        // emit to all users except originating user
        socket.broadcast.to(params.room).emit('newMessageEvent',
            generateMessage('Admin',`${params.name} joined chat channel ${params.room}`));

        eventCallback(); // no error
    });

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserListEvent', users.getListUser(user.room));
            io.to(user.room).emit('newMessageEvent', generateMessage('Admin', `${user.name} has left.`));
        }



    });
});


server.listen(port, () => {
  console.log(`listening on ${port}`);
});