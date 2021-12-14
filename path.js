const path = require('path');
const os = require('os');
const fs = require('fs');

// var pathObj = path.parse(__filename);           // Parse/splits entire path into diff sections like root, dir, base, ext and name of file.
// console.log(pathObj);

var freeMem = os.freemem();
var totalMem = os.totalmem();

// Template string defined in ES6/ ES 2015
console.log(`Free memory :${freeMem}, Total Memory: ${totalMem}`);

const filesAndDir = fs.readdirSync('./');             // Synchronous read: Lists all files and sub directories inside current directory as array of strings
console.log(filesAndDir);

fs.readdir('./', (err, files) => {                   //  Asynchronous read: callback executed after completion(err and files are results of operation)
    if (err) console.log(err);
    else console.log(files);    
});

// Always prefer to use asynchronous method
