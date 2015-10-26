"use strict"

let fx = require('./fx');

let cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollarValue: 700000,
    inStock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollarValue: 648000,
    inStock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollarValue: 132000,
    inStock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollarValue: 114200,
    inStock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollarValue: 1850000,
    inStock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollarValue: 1300000,
    inStock: false
  },
];

let isLastInStock = fx.compose(fx.prop('inStock'), fx.last);
let nameOfFirstCar = fx.compose(fx.prop('name'), fx.head);

let average = (xs) => xs.reduce((prev, next) => prev + next) / xs.length;
let averageDollarValue = fx.compose(average, fx.map(fx.prop('dollarValue')));
let underscore = fx.replace(/\W+/g, '_');
let sanitizeNames = fx.compose(fx.map(underscore), fx.map(fx.toLowerCase), fx.map(fx.prop('name')));
let availablePrices = fx.compose(fx.join(', '), fx.map(fx.prop('dollarValue')), fx.filter(fx.prop('inStock')));
let fastestCar = fx.compose(fx.prop('name'), fx.last, fx.sortBy('horsepower'));
