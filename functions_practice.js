'use strict';
var prompt = require("prompt");
// set default parameters - ES6 
const bookings = [];
const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123', 2, 800);  // { flightNum: 'LH123', numPassengers: 2, price: 800 }
createBooking('LH123');          // { flightNum: 'LH123', numPassengers: 1, price: 199 }
createBooking('LH123', 2);       // { flightNum: 'LH123', numPassengers: 2, price: 398 }

const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr.' + passenger.name;
    if (passenger.passport === 24739479284) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
};
checkIn(flight, jonas);      // Checked in
console.log(flight);         // LH234 - reassigning  a string inside function wont change original variable
console.log(jonas);          // { name: 'Mr.Jonas Schmedtmann', passport: 24739479284 } - reassigning/changing an object inside an object will change its copy also since its a referenced value in heap memory

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);          // Changing passport number of object passed
checkIn(flight, jonas);      // Wrong passport!

// Generic functions
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    // console.log(others);
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher Order functions - takes in a function (callback function) as an argument / returns a function itself
const transformer = function (str, fn) {
    return `Transformed String : ${fn(str)} by the function ${fn.name}`;
};

console.log(transformer("Javascript is the best!!", upperFirstWord));
// JS uses callbacks all the time 

const greet = function (greetingMsg) {
    return function (name) {
        console.log(`${greetingMsg} ${name}`);
    }
};
const greetHai = greet('Hai');  // greet('Hai') is a higher order function that returns another function greetHai that is called then to console the greeting.
greetHai('Sujitha');
greetHai('Nitara');
greet('Hey')('Sujitha');    // useful in functional programming

// Using arrow function in a single line - one arrow function returns another arrow function
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Good luck')('Sujitha');

// Partial application
// General tax rate
const addTax = (taxRate, price) => price + (price * taxRate) / 100;
console.log(addTax(20, 200));

// VAT rate- 23% preset to general tax function
const addVAT = addTax.bind(null, 23); // not concern about this keyword - hence set to null 
console.log(addVAT(257));

// function that returns another function
const newAddTax = rate => price => price + price * rate;
console.log(newAddTax(0.23)(451));

const poll = {
    question: 'What is your favourite programming language?',

    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],

    // This generates [0, 0, 0, 0]. 
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        // Get answer from user
        const answer = Number(
            prompt.get(
                `${this.question}\n${this.options.join('\n')}\n(Write option number)`
            )
        );
        console.log(answer);
        // Register answer
        if (typeof answer === 'number' &&
            answer < this.answers.length) {
            this.answers[answer]++;
            this.displayResults();
            this.displayResults('string');
        }
    },
    // display answers array as an array or as a string
    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            // Poll results are 13, 2, 4, 1
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    },
};

poll.registerNewAnswer();

// call displayResults of poll object with this keyword pointing to another object {answers: [5,2,3]}
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 6, 9, 5, 2, 3] });

// Immediately Invoked Function Expressions (IIFE) - function that runs only once and never again
const runOnce = function () {
    console.log('This will never run again');
};
runOnce();

// IIFE - not being saved anywhere and not reusable , invoked when defined
(function () {
    console.log('This will never run again');
    const isPrivate = 23;              // not accessible from global scope
})();

// Arrow IIFE
(() => console.log('This will also never run again'))();

// create a block to create a new scope instead of a new function
{
    const isPrivate = 23;             // not accessible outside
    var notPrivate = 46;
}
// console.log(isPrivate);                
console.log(notPrivate);               // accessible

