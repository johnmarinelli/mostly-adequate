"use strict"

let fx = require('./fx.js');

let hasSpaces = fx.match(/\s+/g);
let replaceVowels = fx.replace(/[aeiou]/ig);
let filteredNullsAndUndefs = fx.filter(function(elem) {
  return elem != null || elem != undefined;
});
let f = filteredNullsAndUndefs([null, 1, undefined, 2]);

let addTwo = fx.map(function(elem) {
  return elem + 2;
});

// currying example
let add = x => {
  return function(y) {
    return x + y;
  };
};

let inc = add(1);
let words = fx.split(' ');
let sentences = fx.map(words, ['hello world', 'fizz buzz', 'whatever']);
let filterQs = fx.filter(fx.match(/q/i));
let keepHighest = function(x, y) {
  return x >= y ? x : y;
};
let max = fx.reduce(keepHighest, -Infinity);
let maxArray = max([10, 20, 30, 40]);
let sliceFirst = fx.slice(0, 1);
let take = fx.curry(function(n, str) {
  return str.slice(0, n);
});
let sliceFour = take(4);
let addThree = fx.compose(x => x + 1, y => y + 2);
let shout = fx.compose(x => x + '!', x => x.toUpperCase());

let initials = fx.compose(fx.join('. '), fx.map(fx.compose(fx.toUpperCase, fx.head)), fx.split(' '));
let dasherize = fx.compose(fx.join('-'), fx.split(' '), fx.replace(/\s{2,}/ig, ' '), fx.toLowerCase);

