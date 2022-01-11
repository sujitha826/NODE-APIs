const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;                             // passengerCount is declared in parent function and can ne accessed inside callback function
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();  // booker is a function returned by secureBooking()
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
console.dir(booker);

// More Closure Examples
let f;
const g = function () {
    const a = 23;
    f = function () {          // g does not return f
        console.log(a * 2);
    };
};
g();             // [Function (anonymous)] 
f();             // 46 - here closure keeps 'a' variable of 'g'(birth place of f) inside 'f' defined


// Reassigning f to another function
const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
};

h();
f();             // 1554 - here closure keeps 'b' variable of 'h'(birth place of f) inside 'f' defined
// first f born at g and then reborn at h. In both cases f keeps or remembers the variable environment( a and b respectively) in its backpack even after its birth place destroyed after execution.

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    // This function inside setTimeout will be executed only after 3 seconds
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000;                     // global scope - its not taken by inner function since the same variable with a different value is kept by closure property.
boardPassengers(180, 3);

// Variable 'header' which is defined in IIFE can be accessed inside addEventListener callback function only because of closure property
// IIFE
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', function () {
        header.style.color = 'blue';
    });
})();
