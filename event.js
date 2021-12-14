var events = require('events');
var eventEmitter = new events.EventEmitter();             // Create an eventEmitter object of class EventEmitter
var log = require('./logger');
var date = require('./myfirstmodule');

//**********Event 1 - scream**********//
//Create an event handler/listener:
var myEventHandler = function (arg) {
  console.log('I hear a scream!', arg);
}

//Assign or register the eventhandler/listener to an event as a callback function : will be executed when a "scream" event is fired.
eventEmitter.on('scream', myEventHandler);                     // or use 'addListener' instead of 'on'
//Fire the 'scream' event: To fire/raise an event, use the emit() method
eventEmitter.emit('scream', { id: 1, url: 'http://' });         // emit an event with some data as an object which can be accessed inside listener function

//**********Event 2 - logging**********//
var dated = date();
eventEmitter.on('logging', log);
eventEmitter.emit('logging', { message: 'Hai guys' , dated : dated});

// Register listener should be done before emiting event