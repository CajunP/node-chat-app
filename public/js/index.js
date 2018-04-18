
  var socket = io();

  socket.on('connect', function()  {
    console.log('Connected to server');

  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });


  socket.on('newMessage', function(message) {
    console.log('New message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
  });

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); //para que no refreshee la pagina dsp del submit

  //Down: Generates message inputted in the submit box
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
//Setting click listener
var locationButton = jQuery('#send-location');

//Click events
locationButton.on('click', function () {
  //do they have acces to geolocation api in this browser?
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by browser');
  }
  //fetch location
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location.');
  })
});
