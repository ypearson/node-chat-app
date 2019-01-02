var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessageEvent', {
    from: 'Mike',
    text:' Hey, how is it going?'
  });

});

socket.on('disconnect', function() {
  console.log('Server disconnecting from client');
});

socket.on("newMessageEvent", function(newMessage) {
  console.log('newMessage:', newMessage);

});