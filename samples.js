var http = require('http');            // built-in module
var dt = require('./myfirstmodule');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('myfirstmodule.js', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.write("The date and time are currently: " + dt.myDateTime);   
        res.write(data);                        // res.write(url) => writes the the part of the url that comes after the domain name
        res.end();
    });
}).listen(8080);                            // localhost(this computer) acts as a server at port 8080 when requested


