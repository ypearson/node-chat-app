var socket = io();

function scrollToBottom() {

  // Selectors
  var messages = $("messages");
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight      = messages.prop('clientHeight');
  var scrollTop         = messages.prop('scrollTop');
  var scrollHeight      = messages.prop('scrollHeight');
  var newMessageHeight  = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    console.log("Should roll");
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
  var params = $.deparam(window.location.search);

  socket.emit("joinEvent", params, function(err) {

    if(err) {
      console.log(err);
      window.location.href= '/'
    } else {
      console.log(`Joining as ${params.name} in room ${params.room}`)
    }
  });

});

socket.on('disconnect', function() {
  console.log('Server disconnecting from client');
});

socket.on('updateUserListEvent', function(users) {
  console.log('Users list', users);

  var ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  })

  $('#users').html(ol);

});

socket.on('newMessageEvent', function(msg) {

  console.log(msg);

  var formatedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#message-template').html();// return html inside script tags
  var html = Mustache.render(template, {
    text:msg.text,
    from:msg.from,
    createdAt: formatedTime
  });
  $('#messages').append(html);

  // console.log('msg:', msg);
  // var formatedTime = moment(msg.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // li.text(`${msg.from}: ${msg.message} [${formatedTime}]`);
  // $('#messages').append(li);
});

socket.on('newLocationMessageEvent', function(msg) {
    console.log('newLocationMessageEvent',msg);
    var formatedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      url:msg.url,
      from:msg.from,
      createdAt:formatedTime
    });
    $("#messages").append(html);

    // var li = $('<li></li>');
    // li.text(`${msg.from}: `);
    // var a  = $('<a target="_blank">My location</a>');
    // a.attr('href',msg.url);
    // li.append(a);
    // var span = $('<span></span>');
    // span.text(` [${formatedTime}]`);
    // li.append(span);
    // $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    var msgBox = $('#message-input[name=message]');
    e.preventDefault();

    socket.emit('createMessageEvent', {
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