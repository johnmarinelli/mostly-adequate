"use strict"

let curry = require('lodash').curry;

let match = curry((what, str) => str.match(what));
let replace = curry((what, replacement, str) => str.replace(what, replacement));
let filter = curry((fx, array) => array.filter(fx));
let map = curry((fx, array) => array.map(fx));
let split = curry((what, str) => str.split(what));
let reduce = curry((fx, acc, xs) => xs.reduce(fx, acc));
let slice = curry((start, end, xs) => xs.slice(start, end));
let head = curry((xs) => xs[0]);
let join = curry((sep, xs) => xs.join(sep));
let toUpperCase = curry((str) => str.toUpperCase());
let toLowerCase = curry((str) => str.toLowerCase());
let trace = curry((msg, x) => {
  console.log(msg, x, typeof x);
  return x;
});
let id = (x) => x;
let last = curry((xs) => xs[xs.length-1]);
let prop = curry((what, x) => x[what]);
let maximumProp = curry((what, xs) => xs.reduce((p, n) => p[what] > n[what] ? p : n));
let sortBy = curry((what, xs) => xs.sort((p, n) => p[what] > n[what] ? 1 : -1));
let reverse = curry((xs) => xs.reverse());

// have to use function(){} syntax b/c arguments var is unavailable with arrow syntax
// my own implementation
/*
var compose = function() {
  // fifo queue of fxs
  var fifo = [];
  var i = 0,
    len = arguments.length;

  for ( ; i < len; ++i) {
    if (arguments[i] instanceof Function) 
      fifo.push(arguments[i]); 
  }

  return (x) => {
    while (fifo.length > 1) {
      var f = fifo.pop();
      x = f(x);
    }

    return fifo[0](x);
  };
};
*/

// from support.js from book
/*
var compose = function() {
  var functions = arguments,
    functionsLen = functions.length;

  return function() {
    var i = functionsLen;

    for ( ; --i >= 0; ) {
      var fn = functions[i],
        args = fn.length ? Array.prototype.slice.call(arguments, 0, fn.length) : arguments,
        nextArgs = Array.prototype.slice.call(arguments, (fn.length || 1));

        nextArgs.unshift(fn.apply(this, args));
        args = nextArgs;
    }

    return arguments[0];
  };
};
*/

// underscorejs implementation
let compose = function() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};

module.exports = {
  curry: curry,
  match: match,
  replace: replace,
  filter: filter,
  map: map,
  split: split,
  reduce: reduce,
  slice: slice,
  compose: compose,
  head: head,
  join: join,
  toUpperCase: toUpperCase,
  toLowerCase: toLowerCase,
  trace: trace,
  id: id,
  last: last,
  prop: prop,
  maximumProp: maximumProp,
  sortBy: sortBy,
  reverse: reverse
};
