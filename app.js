import express from "express";
import fetch from "node-fetch";
import * as redis from "redis";

const PORT = process.env.PORT || 5000;            // server port
const REDIS_PORT = process.env.PORT || 6379;      // redis port

const client = redis.createClient(REDIS_PORT);  //create redis client

const app = express();

app.get("/getrepos/:username", cacheStore, getPublicRepos);


async function getPublicRepos(req, res, next) {
    console.log("Fetching from github...");
    try {
        const user = req.params.username;
        const repos = await fetch(`https://api.github.com/users/${user}`);
        const data = await repos.json();
        client.setex(user, 4800, data.public_repos);                     //set to redis with expiration of 4800 ms
        res.send(setResponse(user, data.public_repos));
    }
    catch (err) {
        console.log("Error", err.message);
        res.status(500);
    }
}

function setResponse(user, repos) {
    return `<h1>${user} has ${repos} public repostories in Github</h1>`;
}

function cacheStore(req, res, next) {
    const user = req.params.username;
    client.get(user, (err, data) => {               // to get value of key :user
        if (err) throw err;
        if (data !== null) {
            res.send(setResponse(user, data));
        }
        else {
            next();
        }
    })
}

app.listen(5000, () => {
    console.log(`Server listening at ${PORT}`);
});

//http://localhost:5000/getrepos/sujitha-nitara
