
  var socket = io();

  socket.on('connect', function()  {
    console.log('Connected to server');

  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });


  socket.on('newMessage', function(message) {
    //Usar momentjs para dar el tiempo del mensaje
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);

  });

socket.on('newLocationMessage', function(message) {
  //Usar momentjs para dar el tiempo del mensaje
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); //para que no refreshee la pagina dsp del submit

  var messageTextbox = jQuery('[name=message]');

  //Down: Generates message inputted in the submit box
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
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

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  //fetch location
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');

    alert('Unable to fetch location.');
  })
});
