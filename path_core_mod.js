// Path is a core module available inbuilt with nodeJs
// The path module provides utilities for working with file and directory paths.

const path = require('path');
//Base file name
console.log(__filename);   //logs full path of current file name
console.log(path.basename(__filename));  //logs basename of current filename
console.log(path.delimiter);
console.log(path.dirname(__filename));   //logs directory name of current filename

// Create a path object
console.log(path.parse(__filename));  // can access individual properties also

//Concatenate paths
console.log(path.join(__dirname, 'test', 'new.html'));
