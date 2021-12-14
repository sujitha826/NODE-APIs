// Import Logger class here
const Logger = require('./event_class');

// logger is the object of class Logger
const logger = new Logger();

// logger can access all methods of Logger and EventEmitter classes
logger.on('messageLogged', (arg) => {
    console.log("Listener called", arg);
});

logger.log("Hai guys");
