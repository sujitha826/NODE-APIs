const restaurant = {
    name: "Nitara's Kitchen",
    mainMenu: ["Veg Fried Rice", "Garlic chicken", "Chicken Nuggets", "Chicken Noodles", "Chilly Chicken"],
    catagories: ["Chineese", "Arabian", "Indian"],
    starterMenu: ["Chicken Soup", "Chicken Lolipop", "Chicken Popcorn", "Garlic Bread"],
    openHours: {
        fri: { open: 11, close: 23 },
        sat: { open: 12, close: 24 },
        sun: { open: 0, close: 24 }
    },
    order: function (startIndex, mainIndex) {
        return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
    },
    orderDelivery: function ({ startIndex = 1, mainIndex = 0, time = "22.00", address }) {
        return `Order received for items ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} and will be delivered to ${address} by ${time}`
    },
    orderPasta: function (ing1, ing2, ing3) {
        return `Pasta order received made of ingradients ${ing1}, ${ing2} and ${ing3}`
    }
};

// Destructure Object - Extremely useful addition to JS in case of API calls interact with other web apps
// const { name: restaurantName, openHours: workingTime, catagories: varietyFood } = restaurant;
// console.log(restaurantName, workingTime, varietyFood);

// If property name doesn't exist, we can set default value as an empty array , also default value can be set to existing property names
const { name: restaurantName,
    openHours: workingTime = [],
    catagories: varietyFood, menu = [] }
    = restaurant;
console.log(restaurantName, workingTime, varietyFood, menu);

// Mutating variables
let a = 99;
let b = 33;
const obj = { a: 23, b: 45 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const { fri: { open: O, close: C } } = restaurant.openHours;
console.log(O, C);

// This function call makes automatic destructuring of object to individual arguments 
console.log(restaurant.orderDelivery({ startIndex: 1, mainindex: 2, time: "22.00", address: "Jew street, Fort kochi" }));

// Spread Operator(...) to unpack all array elements out of the array
// It converts the array into individual elements- destructuring entire arrayonce without assigning to variables
arr = [3, 4, 5];
newArr = [1, 2, ...arr]; //[ 1, 2, 3, 4, 5 ] 
arr2 = [1, 2, arr];      //[ 1, 2, [ 3, 4, 5 ] ]
console.log(newArr, arr2);
console.log(...newArr);  //1 2 3 4 5

const newMenu = [...restaurant.mainMenu, "Dragon Chicken"];
restaurant.mainMenu = newMenu;
console.log(restaurant);

// Spread operator to create a shallow copy of an array
// To unpack a string
const str = "Nitara";
const letters = [...str, ' ', 'K.'];
console.log(letters);

// Only use spread operator to pass individual argument values to a function or within an array
// const ingradients = [prompt("Lets make a pasta!! Ingradient 1 pls"), prompt("Lets make a pasta!! Ingradient 2 pls"), prompt("Lets make a pasta!! Ingradient 3 pls")];
// console.log(ingradients);
let ingradients = ["mushrooms", "cheese", "aspargus"];
restaurant.orderPasta(...ingradients);

// Spread operator on object
const newRestaurant = { foundedIn: 2030, ...restaurant, founder: "Sujitha" };
console.log(newRestaurant);

// Shallow Copy of Object - If change is made on one or more property values of the object , that will not reflect on the other.
const restaurantCopy = { ...restaurant };


