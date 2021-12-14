/*Middleware literally means anything you put in the middle of one layer of the software and another.
 Express middleware are functions that execute during the lifecycle of a request to the Express server. 
 Each middleware has access to the HTTP request and response for each route (or path) it’s attached to.
In fact, Express itself is compromised wholly of middleware functions.
 Additionally, middleware can either terminate the HTTP request or pass it on to another middleware function using next (more on that soon). 
 This “chaining” of middleware allows you to compartmentalize your code and create reusable middleware.*/


/*Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware in the stack.
If the current middleware function does not end the request-response cycle, 
it must call next() to pass control to the next middleware function. 
Otherwise, the request will be left hanging.*/


//Starting with Express 5, middleware functions that return a Promise will call next(value) when they reject or throw an error. next will be called with either the rejected value or the thrown Error.

//Middleware function myLogger
//Here is a simple example of a middleware function called “myLogger”.
//This function just prints “LOGGED” when a request to the app passes through it. 
//The middleware function is assigned to a variable named myLogger.



//To load the middleware function, call app.use(), 
//specifying the middleware function. 
//For example, the following code loads the myLogger middleware function before the route to the root path (/).
//Eg:

var express = require('express')
var app = express()

var myLogger = function (req, res, next) {  //Middleware function assigned to variable myLogger
  console.log('LOGGED')
  next()
}

var requestTime = function (req, res, next) {   //Middleware function requestTime
    req.requestTime = Date.now()
    next()
}

app.use(myLogger)   //Use myLogger on every usage of app
app.use(requestTime) //Use requestTime on app

app.get('/', function (req, res) {  // Route to the root path
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText)  
})

app.listen(3000)

/*Every time the app receives a request, it prints the message “LOGGED” to the terminal.
The order of middleware loading is important: middleware functions that are loaded first are also executed first.
If myLogger is loaded after the route to the root path, the request never reaches it and the app doesn’t print “LOGGED”,
 because the route handler of the root path terminates the request-response cycle.
The middleware function myLogger simply prints a message, then passes on the request to the next middleware function in the stack by calling the next() function.*/


