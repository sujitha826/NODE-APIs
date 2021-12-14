/*Redis is an open source , in-memory data structure store, used as a database, cache, and message broker. 
Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, 
bitmaps, hyperloglogs, geospatial indexes, and streams.*/

/*Redis is best suited to situations that require data to be retrieved and delivered to the client as quickly as possible. 
It’s pretty versatile, and it has numerous use cases, including:

caching
as a NoSQL database
as a message broker
session management
real-time analytics
event streaming*/

const redis = require("redis");
const client = redis.createClient();                         //127.0.0.1:6379
client.HMSET("frameworks", "Python", "Django", "Node.js", "Express", "Java", "Spring", (err, reply) => {
  if (err) throw err;
  else {
    console.log(reply);              //OK
  }
});

// exists or not
client.exists('frameworks', function (err, reply) {
  if (reply === 1) {
    console.log('Exists!');         //Exists!
  } else {
    console.log('Doesn\'t exist!');
  }
});


//delete
// client.del('frameworks', function (err, reply) {
//   console.log(reply); // 1
// });

//give an expiration time to an existing key(in secs)
client.set('status', 'logged_in');
client.expire('status', 300);

//incrementing and decrementing keys
client.set('working_days', 5, function () {
  client.incr('working_days', function (err, reply) {
    console.log(reply);                                // 6
  });
});

//to decrement a key you can use functions like decr() and decrby()
//FLUSHALL or FLUSHDB commands in the Redis CLI to delete all keys in all databases or in the current one respectively.

//hashes in Redis are meant to store complex data. Hashes are represented as maps between a string field and a string value
//HSET key field value [field value ...]
//HSET myhash field1 "Hello" => (integer) 1:The number of fields that were added
client.HSET('Day1', 'work1', 'Redis Commands');
client.HGETALL('Day1', function (err, reply) {
  console.log(reply);                           // { work1: 'Redis Commands' }
});

client.HMSET('Day2', 'work1', 'Redis Commands', 'work2', 'PM2');
client.HGETALL('Day2', function (err, reply) {    //{ work1: 'Redis Commands', work2: 'PM2' }
  console.log(reply);
});

/*Add New Hash(Object)
Redis comes with two different built-in functions for setting key-value pairs in hash:
hset — Set field(key) in the hash with a value. If the hash does not exist, a new hash will be created. If the field (key) already exists in an existing hash, it will be overwritten by the new value.
hmset — Similar to hset but it allows multiple input parameters in a single command.
This function is deprecated and you should use hset for single or multiple input parameters from now on.*/
//HMSET myhash field1 "Hello" field2 "World" => "OK"

//GETSET
/*Atomically sets key to value and returns the old value stored at key.
 Returns an error when key exists but does not hold a string value.
 Any previous time to live(TTL) associated with the key is discarded 
 on successful SET operation.*/

//Can be used together with INCR for counting with atomic reset
//INCR mycounter => (integer) 1
//GETSET mycounter "0" => "1"
//GET mycounter => "0"

client.SET('counter', "0");
client.INCR('counter');
client.getset('counter', "0");
client.get('counter', function (err, reply) {
  console.log(reply);         // 0
});
