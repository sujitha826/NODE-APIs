// File System module (fs) is an inbuilt core module with node.js

const fs = require('fs');
const path = require('path');

//mkdir has sync and async versions, in case of sync no call back
//async create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if (err) throw err;
    else {
        console.log("New folder created..");
    }
});

// Create and write to file

fs.writeFile(path.join(__dirname, '/test', 'Hello.txt'), 'Hello World!!!', err => {
    if (err) throw err;
    console.log("File created and written into it..")
});

