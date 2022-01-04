// "use strict";
var prompt = require("prompt");
const rest = new Map();                 // map constructor
rest.set("name", "Nitara's Kitchen");   // add elements
rest.set(1, "Kochi");
rest.set(2, "Aleppey");

// set method returns the updated map hence it is possible to chain the set methods 
rest.set("catagories", ["Chineese", "Arabian", "Indian"])
    .set("openHours", {
        fri: { open: 11, close: 23 },
        sat: { open: 12, close: 24 },
        sun: { open: 0, close: 24 }
    })
    .set("starterMenu", ["Chicken Soup", "Chicken Lolipop", "Chicken Popcorn", "Garlic Bread"]);

// console.log(rest);
// {
//   'name' => "Nitara's Kitchen",
//   1 => 'Kochi',
//   2 => 'Aleppey',
//   'catagories' => [ 'Chineese', 'Arabian', 'Indian' ],
//   'openHours' => {
//     fri: { open: 11, close: 23 },
//     sat: { open: 12, close: 24 },
//     sun: { open: 0, close: 24 }
//   },
//   'starterMenu' => [
//     'Chicken Soup',
//     'Chicken Lolipop',
//     'Chicken Popcorn',
//     'Garlic Bread'
//   ]
// }

// console.log(rest.has("catagories"));
// console.log(rest.get("openHours"));
// console.log(rest.size);

// Instead of using set method, use array of subarrays to set multiple values at once to a map
const question = new Map([["q1", "which is the best programming language?"], [1, "Java"], [2, "Javascript"], [3, "C++"], ["correct", 2], [true, "Correct"], [false, "Try again !!"]]);
console.log(question);

// Also can use Object.entries(objName) to set map values or convert an object to map
const hoursMap = new Map(Object.entries(rest.get("openHours")));
// console.log(hoursMap);

//iteration over map
// for (const [key, value] of hoursMap) {
//     console.log(value, key);
// };

console.log(question.get("q1"));
for (const [key, value] of question) {
    if (typeof key === "number") console.log(`Answer ${key} : ${value}`);
};


// prompt.start();

// Function reading answer from user - asynchronous operation
let userValue = async () => {
    prompt.get(["answer"], function (err, result) {

        // Printing the result
        console.log('Command-line input received:');
        console.log('answer: ' + result.answer);
        console.log(question.get(question.get("correct") === Number(result.answer)));
    });
};

// Function call
userValue();

// Convert map back to array - array of subarrays
console.log([...question]);

console.log([...question.entries()]);   // same ouput as console.log([...question]);
console.log([...question.keys()]);      // [ 'q1', 1, 2, 3, 'correct', true, false ]
console.log([...question.values()]);  

// 4 main built in Data structures in JS

/* Arrays, Objects, Sets and Map 
To choose one, that depends on 
type of data if a simple list, 
use array or set and 
if key-value pairs use objects or maps
(especially for JSON data fetched using web APIs)*/

// Other built in are weakset and weakmap DSs
// Non-built in are : stacks, queues, linked lists, trees and hash tables
