var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Server disconnecting from client');
});

socket.on('newMessageEvent', function(newMessage) {
  console.log('newMessage:', newMessage);
  var li = $('<li></li>')
  li.text(`${newMessage.from}: ${newMessage.message}`);
  $('#messages').append(li);
});

// socket.emit("createMessageEvent", {
//     from: "frank",
//     text: "hi!"},
//     function(serverAck) {
//         console.log("Got Ack from server:", serverAck);
//     });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    // console.log('val',$('#message-input[name=message]').val());
    // console.log('attr',$('#message-input[name=message]').attr('value'));

    socket.emit('createMessageEvent', {
        from:'User',
        text: $('#message-input[name=message]').val()
    }, function(data) {
        console.log("server ack:", data)
    });

    $('#message-input[name=message]').val('');
    // $('#message-input[name=message]').attr('value','')

});