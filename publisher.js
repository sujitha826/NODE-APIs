/*Simple pubsub for node using Redis(Node Redis Pubsub). Why use NRP instead of Node's EventEmitter? 
It is useful when your Node application needs to share data with other applications. 
In that case EventEmitter will not help you, you need an external pubsub provider. 
Redis is pretty good at this, but its pubsub API is strange.*/

const express = require("express");
const redis = require("redis");

const publisher = redis.createClient();

const app = express();

app.get("/", (req, res) => {
  const user = {
    id: "123456",
    name: "Davis",
  };
  publisher.publish("user-notify", JSON.stringify(user))  //pass the'topic name'to write the data and 'Data'
  res.send("Publishing an Event using Redis")
});

app.listen(3005, () => {
  console.log(`server is listening on PORT 3005`)
});