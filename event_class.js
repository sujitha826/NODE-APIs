const EventEmitter = require('events');
// To signal something happened, we need to create a class that extends EventEmitter so that all functionalities of EventEmitter will be possible inside Logger
// Class Logger can use all methods of parent class EventEmitter

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, url: 'http://' });   // 'this' here refers to class Logger
    }
}

module.exports = Logger;

