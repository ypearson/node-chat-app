const moment = require('moment');

var date = moment();

date.add(1,'year'); // add a year

date.subtract(1,'year'); // subtract a year

console.log(date.format('MMM Do, YYYY')); // Jan 3rd 2020

var date1 = moment()

console.log(date1.format('h:mm a'));

date1.add(5,'hours');

console.log(date1.format('h:mm a'));
console.log(date1.format('h:mm A'));


var date2 = moment().valueOf();

console.log(date2);
// console.log(moment());
