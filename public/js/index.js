
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


    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
  });

socket.on('newLocationMessage', function(message) {
  //Usar momentjs para dar el tiempo del mensaje
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);// Mete la var a en la var li
  jQuery('#messages').append(li);
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
