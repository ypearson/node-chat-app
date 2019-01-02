var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Server disconnecting from client');
});

socket.on('newMessageEvent', function(newMessage) {
  console.log('newMessage:', newMessage);

});