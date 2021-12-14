
const redis = require("redis");
const client = redis.createClient();  //port specify needed if server running on other server than localhost like const client = redis.createClient(port, host);, on localhost its running on 6379

//establish a connection to the Redis data store; by default, the port is 6379 and the host is 127.0.0.1.
client.on("connect", function () {
    console.log("You are now connected");
});

//Redis stores data in a key-value format. It supports a number of data types 
//that are used in various functions of the client object

//Basic operations
client.set("student", "John", function (err, reply) {
    console.log(reply);
}); // OK

//The object client.get(); will display the key that is stored in the Redis database.
client.get('student', function (err, reply) {
    console.log(reply);
});

//A different Redis data types– HASH, set of key-value pairs(object).
client.hmset("employees", { HR: "Antony", MIS: " Clint", Accounting: "Mark" });
client.hgetall("employees", function (err, object) {
    console.log(object);
});
client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');
//The first argument to hmset() is the name of the key. Subsequent arguments represent key–value pairs. 
//client.hmset() and client.HMSET() are the same.
client.hgetall('frameworks_hash', function (err, object) {
    console.log(object);             // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

//To store lists in Redis

client.rpush("vegetable", "carrot");
client.rpush("vegetable", "celeri");
client.get("vegetable", function (err, reply) {
    console.log(reply);                       
});

// To display all in list
client.lrange("vegetable", 0, -1, function (err, reply) {
    console.log(reply);        
});


client.lpush("frameworks_list", "ReactJS");
client.lpush("frameworks_list", "Angular");
client.get("frameworks_list", function (err, reply) {
    console.log(reply);                       
});

//The first item of the array represents the name of the key, while the rest represent the elements of the list.
client.lrange("frameworks_list", 0, -1, function (err, reply) {
    console.log(reply);                      
});