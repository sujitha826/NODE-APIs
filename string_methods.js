let nameIncorrect = 'sUjItha';
let nameLower = nameIncorrect.toLowerCase();
const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);   // slice(-1) gives only last character
console.log(nameCorrect);

// trim a string
const mailId = " Sujitha6079@gmail.com \n";
// const lowerMail = mailId.toLowerCase();
// const trimmedMail = lowerMail.trim();   // trim space and enter
const normalizedMail = (mailId.toLowerCase()).trim();
console.log(normalizedMail);

// repalce a character/word by another but only first occurence
const priceGB = '288,75P';
const priceUS = priceGB.replace('P', '$').replace(',', '.');
console.log(priceUS);

// replace all occurences, using reg expression like 
const announcement = 'Your boarding door is 23,come to that door';
console.log(announcement.replace(/door/g, 'gate'));
announcement.includes('door');
announcement.startsWith("Hello");

const plane = 'Airbus A320neo';
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW Airbus family');
};
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();
    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are NOT allowed on board');
    } else {
        console.log('Welcome aboard!');
    }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');

// Split 
console.log('a+very+nice+name'.split('+'));
console.log('Nitara Kiran'.split(' '));            // [ 'Nitara', 'Kiran' ]

// Destructure using split
const [firstName, lastName] = 'Sujitha K'.split(' ');

// Join
console.log(['Ms.', firstName, lastName].join(' ')); // Ms. Sujitha K

// Capitalize a name

const capitalizeName = function (name) {
    const names = name.split(' ');
    const nameUpper = [];
    for (const each of names) {
        nameUpper.push(each[0].toUpperCase() + each.slice(1));
        // nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(nameUpper.join(' '));
};

capitalizeName('anand babu');   // Anand Babu

// Padding - add characters to start or end
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));  // ++++++Go to gate 23!++++++++++

const maskCreditCard = function (number) {
    const str = number + '';                   // convert number to string
    const last = str.slice(-4);                // take last 4 
    return last.padStart(str.length, '*');     // pad at start some * to fit the original length
};
console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));

// Repeat string multiple times
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'✈  '.repeat(n)}`);
};
planesInLine(5);

const camelCase = function (str) {
    const lower = str.toLowerCase();
    console.log(lower);
    if (lower.includes('_')) {
        const newStrr = lower.split('_');
        console.log(newStrr);
        const camelArr = [newStrr[0]];
        for (let each of newStrr) {
            if (each === newStrr[0]) continue
            camelArr.push(each.replace(each[0], each[0].toUpperCase()));
        }
        const camel = camelArr.join('');
        console.log(camel);
    }
};
camelCase('underscore_case');
camelCase('first_name');
camelCase('calculate_AGE');

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';');
    const output = `${type.startsWith('_Delayed') ? '🛑' : ''} ${type.replace('_', ' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
    console.log(output);
};
// output
/* 🛑  Delayed_Departure FAO TXL (11h25)
             Arrival BRU FAO (11h45)
 🛑  Delayed_Arrival HEL FAO (12h05)
           Departure FAO LIS (12h30) */