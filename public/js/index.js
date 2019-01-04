var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Server disconnecting from client');
});

socket.on('newMessageEvent', function(msg) {
  console.log('msg:', msg);
  var formatedTime = moment(msg.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.message} [${formatedTime}]`);
  $('#messages').append(li);
});

socket.on('newLocationMessageEvent', function(msg) {
    console.log('newLocationMessageEvent',msg);
    var formatedTime = moment(msg.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${msg.from}: `);
    var a  = $('<a target="_blank">My location</a>');
    a.attr('href',msg.url);
    li.append(a);
    var span = $('<span></span>');
    span.text(` [${formatedTime}]`);
    li.append(span);
    $('#messages').append(li);

});

$('#message-form').on('submit', function(e) {
    var msgBox = $('#message-input[name=message]');
    e.preventDefault();

    socket.emit('createMessageEvent', {
        from:'User',
        text: msgBox.val()
    }, function(data) {
        console.log('server ack:', data)
        msgBox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function() {

    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(pos) {
        locationButton.removeAttr('disabled').text("Send location");
        socket.emit('createLocationMessageEvent', {
            latitude:pos.coords.latitude,
            longitude:pos.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text("Send location");
        alert('unable to get location.');
    });

});