'use strict';
// Arrays are itself objects and hence got access to many built-in methods
// Slice method returns a new array which is a slice of original array
// shallow copy of an array by two methods - slice and spread operator
let arr = ["a", "b", "c", "d"];
let arr2 = arr.slice();
let arr3 = [...arr];
arr2[0] = "w";
console.log(arr, arr2);                // shallow copy - changing one dont change in their copy

// SPLICE - It does the same as slice method but mutates the original array to a new one contains the elements excluding deleted
let arr4 = arr.splice(2);
console.log(arr4, arr);           // arr4 - [ 'c', 'd' ] returns the elments deleted and arr - [ 'a', 'b' ] contains the elements excluding deleted

console.log(arr4.splice(0, 1));    // param1 - start index from which elements are to be deleted, param2 - deletecount

console.log(arr4.reverse());      // arr4 gets reversed
console.log(arr.concat(arr4));    // concatenate2 arrays
console.log([...arr, ...arr4]);
let letters = [...arr, ...arr4];
console.log(letters.join('_'));   // array into string

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Looping Arrays: Normal method
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
};

// Looping Arrays: forEach method ( 2 args, callback and lastarg ) - 3 args to callback- mov is each element in array, i is the index, arr is the given array(should follow this order strictly) , last argument is optional -object to refer to 'this' keyword in callback.
console.log("-------------forEach-------------")
movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
    console.log(this);                                     // 'this' here refer to movements array as it is mentioned in the last optional argument of forEach method
}, movements);

// forEach With Maps and Sets
// Map
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {             // Its a strict convention to keep this order of arguments passed to callback
    console.log(`${key}: ${value}`);
});

// Set( no index values or order)
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, set) {         // No keys/index for a set, here '_' is a throwaway or unnecessary variable
    console.log(`${value}: ${value}`);
});

//////////------------Data tranformation methods------------////////////
// The map Method
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);            // original euro array
console.log(movementsUSD);         // new USD array

// Using for..of loop 
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
    (mov, i) =>
        `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
            mov
        )}`
);
console.log(movementsDescriptions);

// filter method
// array of deposits
const deposits = movements.filter(each => each > 0)          // filter method return those elements that pass the condition specified in predicate function
console.log(deposits);

const withdrawals = movements.filter(each => each < 0)
console.log(withdrawals);

// reduce method
const balanceAvailable = movements.reduce((acc, each, index, arr) => {    // 4 args to callback - accumulator/ previous element, current element, current index and array passed
    console.log(`Iteration ${index} : ${acc}`);
    return acc + each                                            // returns 'acc+each' in every iteration and give as the argument acc
}, 0);                                                           // 0 is passed as 2nd argument of reduce method that denotes the initial value of acc
console.log(balanceAvailable);

// Chaining of methods
const totalDepositsinUsd = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsinUsd.toFixed(2));

// Chaining possible only if returned type is an array and its executed as a pipeline
// Debugging of each method will be difficult ,but we can see the map output after each iteration by displaying the third argument,arr

// Calculate summary of total income
const displaySummary = function (movements) {
    const incomes = movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov);
    return incomes;
}
console.log(displaySummary(movements));

const calcAvgHumanAge = ageArray => ((ageArray.reduce((acc, mov) => acc + mov, 0)) / ageArray.length).toFixed(2);

console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));

// find method - iterate over the array to find or retrieve a single element based on a condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
