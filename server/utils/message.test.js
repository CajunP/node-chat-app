var expect = require('expect');

var{generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
  it('should generate the correct message object', () => {
    var from = 'Mike';
    var text = 'Some text';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});

  });
});

describe('generateLocationMessage', () => {
  it('should generate corrrect location object', () => {
    var from = 'Pepe';
    var latitude = 123;
    var longitude = 98;
    var location = generateLocationMessage(from,latitude,longitude);

    expect(location.from).toBe('Pepe');
    expect(location.createdAt).toBeA('number');
    expect(location.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  });
});
