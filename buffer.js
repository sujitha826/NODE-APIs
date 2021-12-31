//  Buffer object is a global object in Node.js, and it is not necessary to import it using the require keyword.

const buf = Buffer.from("Hello World");  // default encoding is 'utf-8'
console.log(buf);              // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64> - in hexadecimal notation of binary data in buffer
console.log(buf.toString());   // string back- Hello World
console.log(buf.toJSON());     // as JSON inside data is stored as an array of unicodes of each character - base-10 encoded

buf.write("2022");             // Overwrite the content
console.log(buf.toString());   // 2022o World - fixed space allocated in buffer and cannot be expanded.

console.log(buf.toString('hex'));  // 323032326f20576f726c64
console.log(buf.toString('base64'));  // MjAyMm8gV29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf16le')); // <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

// for creating an empty Buffer of the length 15:
var buf1 = Buffer.alloc(15);

// values() returns an array of values in a Buffer object
console.log(buf.values());
